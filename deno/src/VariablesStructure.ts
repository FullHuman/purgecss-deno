import { postcss } from "../lib/deps.ts";
import { StringRegExpArray } from "./types/index.ts";
import { matchAll } from "./utils.ts";

class VariableNode {
  public nodes: VariableNode[] = [];
  public value: any;
  public isUsed = false;

  constructor(declaration: any) {
    this.value = declaration;
  }
}

class VariablesStructure {
  public nodes: Map<string, VariableNode> = new Map();
  public usedVariables: Set<string> = new Set();
  public safelist: StringRegExpArray = [];

  addVariable(declaration: any): void {
    const { prop } = declaration;
    if (!this.nodes.has(prop)) {
      const node = new VariableNode(declaration);
      this.nodes.set(prop, node);
    }
  }

  addVariableUsage(
    declaration: any,
    matchedVariables: RegExpMatchArray[],
  ): void {
    const { prop } = declaration;
    const node = this.nodes.get(prop);
    for (const variableMatch of matchedVariables) {
      // capturing group containing the variable is in index 1
      const variableName = variableMatch[1];
      if (this.nodes.has(variableName)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const usedVariableNode = this.nodes.get(variableName)!;
        node?.nodes.push(usedVariableNode);
      }
    }
  }

  addVariableUsageInProperties(matchedVariables: RegExpMatchArray[]): void {
    for (const variableMatch of matchedVariables) {
      // capturing group containing the variable is in index 1
      const variableName = variableMatch[1];
      this.usedVariables.add(variableName);
    }
  }

  setAsUsed(variableName: string): void {
    const node = this.nodes.get(variableName);
    const queue = [node];
    while (queue.length !== 0) {
      const currentNode = queue.pop();
      if (currentNode && !currentNode.isUsed) {
        currentNode.isUsed = true;
        queue.push(...currentNode.nodes);
      }
    }
  }

  removeUnused(): void {
    // check unordered usage
    for (const used of this.usedVariables) {
      const usedNode = this.nodes.get(used);
      if (usedNode) {
        const usedVariablesMatchesInDeclaration = matchAll(
          usedNode.value.value,
          /var\((.+?)[,)]/g,
        );
        usedVariablesMatchesInDeclaration.forEach((usage) => {
          if (!this.usedVariables.has(usage[1])) {
            this.usedVariables.add(usage[1]);
          }
        });
      }
    }

    for (const used of this.usedVariables) {
      this.setAsUsed(used);
    }

    for (const [name, declaration] of this.nodes) {
      if (!declaration.isUsed && !this.isVariablesSafelisted(name)) {
        declaration.value.remove();
      }
    }
  }

  isVariablesSafelisted(variable: string): boolean {
    return this.safelist.some((safelistItem) => {
      return typeof safelistItem === "string"
        ? safelistItem === variable
        : safelistItem.test(variable);
    });
  }
}

export default VariablesStructure;

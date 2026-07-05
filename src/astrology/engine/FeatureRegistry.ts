import { IAstrologyModule, AnalysisContext } from '../models/types';

export class FeatureRegistry {
  private modules: IAstrologyModule[] = [];

  public register(module: IAstrologyModule): void {
    this.modules.push(module);
  }

  public executeAll(context: AnalysisContext): void {
    for (const mod of this.modules) {
      try {
        mod.execute(context);
      } catch (err) {
        console.error(`Error executing module ${mod.name}:`, err);
      }
    }
  }
}

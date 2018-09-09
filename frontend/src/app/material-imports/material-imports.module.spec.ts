import { MaterialImportsModule } from './material-imports.module';

describe('MaterialImportsModule', () => {
  let materialImportsModule: MaterialImportsModule;

  beforeEach(() => {
    materialImportsModule = new MaterialImportsModule();
  });

  it('should create an instance', () => {
    expect(materialImportsModule).toBeTruthy();
  });
});

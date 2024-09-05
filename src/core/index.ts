import { Project, Node, ImportDeclaration, SourceFile, ImportSpecifier } from "ts-morph";

// const tsMorphProject = new Project();

// const sourceFile = tsMorphProject.addSourceFileAtPath("../src/sample.ts");

// const projectImportDeclaration = sourceFile.getImportDeclarations()
//     .find(declaration => declaration.getModuleSpecifierValue() === "ts-morph");


// if (!projectImportDeclaration) {
//     throw new Error('ts-morph is not imported');
// }

// const projectClassName = projectImportDeclaration.getNamedImports()
//     .find(namedImport => namedImport.getName() === "Project");

// if (!projectClassName) {
//     throw new Error('Project class is not imported');
// }

// const projectInstance = sourceFile.getVariableDeclarations()
//     .find(variableDeclaration => {
//         const initializer = variableDeclaration.getInitializer();
//         return initializer && Node.isNewExpression(initializer) &&
//             initializer.getExpression().getText() === projectClassName.getName();
//     });

// if (!projectInstance) {
//     throw new Error("No instance of 'Project' found")
// }

// const references = projectInstance.findReferences();
// const projectUsages: string[] = [];

// references.forEach(ref => {
//     ref.getReferences().forEach(refNode => {
//         const refParent = refNode.getNode().getParent();
//         if (Node.isPropertyAccessExpression(refParent)) {
//             const propertyName = refParent.getName();
//             projectUsages.push(propertyName);
//         }
//     });
// });

// console.log(`APIs/Properties used from the 'Project' instance:`, projectUsages);



class CodeLytic {
    public project: Project;
    public sourceFilePaths: SourceFile[];

    constructor(paths: string[]) {
        this.project = new Project();
        this.project.addSourceFilesAtPaths(paths);
    }

    private getImports(file: SourceFile) {
        console.log(`Imports in source file ${file.getFilePath()}`);
        const imports = []
        
        const importDeclarations: ImportDeclaration[] = file.getImportDeclarations();
        importDeclarations.map(declaration =>  imports.push(declaration.getModuleSpecifierValue()));
        return imports;       
    }

    private getNamedImports(file: SourceFile) {

    }

    // private checkNamedImports

    public getAnalytics() {
        
        const filesInProject: SourceFile[] = this.project.getSourceFiles();
        const global_collection_of_imports = new Map();

        for (let i = 0; i < filesInProject.length; i++) {
            const file: SourceFile = filesInProject[i];
            const file_path: string = file.getFilePath();
            const importsInFile = this.getImports(file);
            global_collection_of_imports.set(file_path, { packages: importsInFile });
        }

        console.dir({ global_collection_of_imports: global_collection_of_imports.entries() }, { depth: 8 });
    }
}

export { CodeLytic }


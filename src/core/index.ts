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

    constructor() {
        this.project = new Project();
        this.project.addSourceFilesAtPaths([`../../lake/sample/**/*.ts`]);
    }

    public getImportsInEachFile() {
        const filesInProject: SourceFile[] = this.project.getSourceFiles();
        
        for (let i = 0; i < filesInProject.length; i++) {
            const file = filesInProject[i];
            console.log(`Imports in source file ${file.getFilePath()}`);

            const importDeclarations: ImportDeclaration[] = file.getImportDeclarations();
            const imports = importDeclarations.find(declaration => console.log({ d: declaration.getModuleSpecifierValue()}));
            
            // const namedImports = imports.getNamedImports().find(namedImport => namedImport.getName() === 'Project');
            console.log({ imports });
        }
    }
}

export {
    CodeLytic
}


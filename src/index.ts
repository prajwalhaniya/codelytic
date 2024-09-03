import { Project, Node } from "ts-morph";

const tsMorphProject = new Project();

const sourceFile = tsMorphProject.addSourceFileAtPath("../src/sample.ts");

const projectImportDeclaration = sourceFile.getImportDeclarations()
    .find(declaration => declaration.getModuleSpecifierValue() === "ts-morph");


if (!projectImportDeclaration) {
    throw new Error('ts-morph is not imported');
}

const projectClassName = projectImportDeclaration.getNamedImports()
    .find(namedImport => namedImport.getName() === "Project");

if (!projectClassName) {
    throw new Error('Project class is not imported');
}

const projectInstance = sourceFile.getVariableDeclarations()
    .find(variableDeclaration => {
        const initializer = variableDeclaration.getInitializer();
        return initializer && Node.isNewExpression(initializer) &&
            initializer.getExpression().getText() === projectClassName.getName();
    });

if (!projectInstance) {
    throw new Error("No instance of 'Project' found")
}

const references = projectInstance.findReferences();
const projectUsages: string[] = [];

references.forEach(ref => {
    ref.getReferences().forEach(refNode => {
        const refParent = refNode.getNode().getParent();
        if (Node.isPropertyAccessExpression(refParent)) {
            const propertyName = refParent.getName();
            projectUsages.push(propertyName);
        }
    });
});

console.log(`APIs/Properties used from the 'Project' instance:`, projectUsages);

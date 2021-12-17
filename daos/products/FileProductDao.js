import { ProductsContainer } from '../../containers/FileContainer.js'


class FileProductDao extends ProductsContainer {
    constructor(fileName) {
        super(`../../db/${fileName}`)
    }
}

export default FileProductDao
const addProdQs = [
    {
        type: 'input',
        name: 'prodName',
        message: 'Enter new product name: '
    },
    {
        type: 'input',
        name: 'deptName',
        message: 'Enter Department for new product: '
    },
    {
        type: 'input',
        name: 'price',
        message: 'Enter retail price for new product: '
    },
    {
        type: 'input',
        name: 'stock_quantity',
        message: 'Enter new product quantity in stock: '
    }
]

const replenishQs = [
    {
        type: 'input',
        name: 'selectItem',
        message: 'Please enter the item # of item to replenish'
    },
    {
        type: 'input',
        name: 'addQty',
        message: 'Please enter the Qty to add'
    }
]

module.exports = {
    addProdQs,
    replenishQs
}
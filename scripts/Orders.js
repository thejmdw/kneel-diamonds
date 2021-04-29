import { getMetals, getOrders, getSizes, getStyles, getTypes } from "./database.js"

const metals = getMetals()
const styles = getStyles()
const sizes = getSizes()
const types = getTypes()

// const foundMetal = metals.find((metal) => metal.id === order.metalId)
// const foundStyle = styles.find((style) => style.id === order.styleId)
// const foundSize = sizes.find((size) => size.id === order.sizeId)







export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
        const buildOrderListItem = (order) => {
            return `<li>
                Order #${order.id} was placed on ${order.timestamp} and the cost is ${order.cost}
            </li>`
        }


    const orders = getOrders()
    // let costString = ""
    let total = 0 

    for (const order of orders) {
        const foundMetal = metals.find((metal) => metal.id === order.metalId)
        const foundStyle = styles.find((style) => style.id === order.styleId)
        const foundSize = sizes.find((size) => size.id === order.sizeId)
        const foundType = types.find((style) => style.id === order.typeId)
        total = (foundMetal.price + foundStyle.price + foundSize.price) * foundType.upCharge

        order.cost = total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

    

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}


module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.count = oldCart.count || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                _id: item._id,
                name: item.name,
                price: item.price,
                url: item.imagePath.small,
                description: item.description.shortDescription,
                quantity: 0,
                subTotalPrice: 0
            };
        }

        storedItem.quantity++;
        storedItem.subTotalPrice = parseFloat(storedItem.price) * storedItem.quantity;

        this.count++;
        this.totalPrice += parseFloat(storedItem.subTotalPrice);
    };

    this.delete = function (id) {
        this.items[id].quantity--;
        this.items[id].subTotalPrice = parseFloat(this.items[id].price) * this.items[id].quantity;

        this.count--;
        this.totalPrice -= parseFloat(this.items[id].price);
        if (this.items[id].quantity <= 0) {
            delete this.items[id];
        }
    };

    this.toArray = function () {
        var a = [];

        for (var id in this.items) {
            a.push(this.items[id]);
        }

        return a;
    }
};
/**
 * Created by USER on 4/8/2017.
 */

/**
 * Created by USER on 4/9/2017.
 */

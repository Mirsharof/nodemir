const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect('mongodb+srv://user:AHoa2kC7sxE53V3h@cluster0.lrfs7.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    const db = mongoose.connection
    db.on("open", () => {
        console.log('mongodbga atlas orqali boglanildi');
    })
    db.on("error", (err) => {
        console.log('mongoga ulanishda hatolik qayd etildi');
    })
}
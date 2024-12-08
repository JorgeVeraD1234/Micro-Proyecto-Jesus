import app from "./app";
import mongoose from "mongoose";


async function main() {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/ToBeDone"
        );
        console.log("Aplicación conectada a la base de datos");
        app.listen(4000, () => {
            console.log("Aplicacion ejecutandose con exito")
        })
    } catch (error) {
        console.log("Ocurrio un error en la base de datos")
    }
}
main();
import prisma from "../Utils/prisma-client.js";
async function seed() {
    try {
        // Crear una categoría
        const category = await prisma.category.create({
            data: {
                name: "Main Platter",
            },
        });

        // Crear un producto
        await prisma.product.create({
            data: {
                name: "Sea Food Platte",
                price: 9.99,
                categoryId: category.id,
                description: "12 Piece Sushi"
            },
        });

        // Crear un usuario
        const user = await prisma.user.create({
            data: {
                name: "John Doe",
                email: "john.doe@example.com",
                password: "not_safe_pass_xd"
            },
        });

        // Crear una mesa
        const table = await prisma.table.create({
            data: {
                name: "Bar C1",
                capacity: 20
            },
        });

        // Crear una orden
        await prisma.order.create({
            data: {
                date: new Date(),
                status: "pending",
                waiterId: user.id,
                tableId: table.id,
            },
        });

        console.log("Seed data created successfully");
    } catch (error) {
        console.error("Error seeding data:", error);
    }
}

seed();

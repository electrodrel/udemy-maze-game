const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

const width = 800;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width,
        height
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

World.add(world, MouseConstraint.create(engine, {
        mouse: Mouse.create(render.canvas)
    })
);

const borders = [Bodies.rectangle(400, 0, 800, 20, { isStatic: true }), 
                 Bodies.rectangle(0, 300, 20, 600, { isStatic: true }),
                 Bodies.rectangle(800, 300, 20, 600, { isStatic: true }),
                 Bodies.rectangle(400, 600, 800, 20, { isStatic: true })]
World.add(world, borders);

for (i = 0; i < 100; i++) {
    let random = Math.floor(Math.random() * Math.floor(5));
    switch (random) {
      case 1:
        World.add(world, Bodies.circle(Math.random() * width, Math.random() * height, 40));
        break;
      case 2:
        World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50));
        break;
      case 3:
        World.add(world, Bodies.polygon(Math.random() * width, Math.random() * height, 60, 20));
        break;
      case 4:
        World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 60, 25));
        break;
    }
}
const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse,
  Body,
  Events,
} = Matter;

const width = 800;
const height = 800;

const widthInUnits = 10;
const heightInUnits = 15;

const unitWidth = width / widthInUnits;
const unitHeight = height / heightInUnits;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

const borders = [
  Bodies.rectangle(width / 2, 0, width, 4, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 4, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 4, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 4, height, { isStatic: true }),
];
World.add(world, borders);

const { verticals, horizontals } = generate(widthInUnits, heightInUnits);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitWidth + unitWidth / 2,
      rowIndex * unitHeight + unitHeight,
      unitWidth,
      5,
      {
        label: "wall",
        isStatic: true,
      }
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitWidth + unitWidth,
      rowIndex * unitHeight + unitHeight / 2,
      5,
      unitHeight,
      {
        label: "wall",
        isStatic: true,
      }
    );
    World.add(world, wall);
  });
});

const goal = Bodies.rectangle(
  width - unitWidth / 2,
  height - unitHeight / 2,
  unitWidth * 0.7,
  unitHeight * 0.7,
  {
    label: "goal",
    isStatic: true,
  }
);
World.add(world, goal);

const ball = Bodies.circle(unitWidth / 2, unitHeight / 2, unitWidth / 4, {
  label: "ball",
});
World.add(world, ball);

document.addEventListener("keydown", (event) => {
  const { x, y } = ball.velocity;
  switch (event.keyCode) {
    case 87:
      Body.setVelocity(ball, { x, y: y - 2 });
      break;
    case 68:
      Body.setVelocity(ball, { x: x + 2, y });
      break;
    case 83:
      Body.setVelocity(ball, { x, y: y + 2 });
      breakl;
    case 65:
      Body.setVelocity(ball, { x: x - 2, y });
      break;
  }
});

Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    const labels = ["ball", "goal"];

    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {      
      world.gravity.y = 1;
      world.bodies.forEach((body) => {
        if (body.label === "wall") {
          Body.setStatic(body, false);
        }
      });
      document.querySelector('.winner').classList.remove('hidden');
    }
  });
});

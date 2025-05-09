const db = require("./database.js");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let insert = db.prepare(`INSERT INTO dados ("DATE", "ANOTATION") VALUES (?, ?)`);
let get = db.prepare(`SELECT * FROM dados`)
let deletetable = db.prepare(`DROP TABLE dados`);

function all() {
  const all = get.all();
  console.log(all);
}

function add() {
  rl.question("Digite a data: ", (date) => {
    rl.question("Digite a anotação: ", (anotation) => {
      let CH = insert.run(date, anotation);
      if (CH.changes > 0) {
        console.log("Registro adicionado com sucesso");
        menu();
      } else {
        console.log("Erro ao adicionar registro!");
        rl.close();
      }
    })
  })
}

function menu() {
  rl.question("Desejs ver os registros, registrar outro ou sair? (ver/ins/sa) ", (answer) => {
    if (answer.toLowerCase() === "ver") {
      all();
      rl.close();
    } else if (answer.toLowerCase() === "ins") {
      add();
    } else {
      console.log("Saindo..");
    }
  })
}

function main() {
  rl.question("Deseja adicionar um novo registro? (s/n) ", (reg) => {
    if (reg.toLowerCase() === "s") {
      add();
    } else {
      rl.question("Deseja ver os registros? (s/n) ", (Z) => {
        if (Z.toLowerCase() === "s") {
          all();
          rl.close();
        } else {
          rl.question("Deseja deletar a tabela? (s/n) ", (dlt) => {
            if (dlt.toLowerCase() === "s") {
              const del = deletetable.run();
              console.log(del.changes > 0 ? "Tabela deletada" : "Erro ao deletar tabela");
              rl.close();
            } else {
              console.log("Saindo..");
              rl.close();
            }
          })
        }
      })
    }
  })
}

main();
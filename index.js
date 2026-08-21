const prompt = require("prompt-sync")()

// Classe que representa um gasto
class Gasto {
    constructor(descricao, valor) {
        this.descricao = descricao
        this.valor = valor
    }

    exibir() {
        console.log(`- ${this.descricao}: R$ ${this.valor.toFixed(2)}`)
    }
}

// Classe responsável pelo controle dos gastos
class ControleDeGastos {
    constructor() {
        this.gastos = []
    }

    adicionarGasto(descricao, valor) {
        const novoGasto = new Gasto(descricao, valor)
        this.gastos.push(novoGasto)

        console.log("\nGasto adicionado com sucesso!")
    }

    listarGastos() {
        console.log("\n===== MEUS GASTOS =====")

        if (this.gastos.length === 0) {
            console.log("Nenhum gasto cadastrado.")
            return
        }

        this.gastos.forEach((gasto, index) => {
            console.log(
                `${index + 1}. ${gasto.descricao} - R$ ${gasto.valor.toFixed(2)}`
            )
        })

        console.log(`\nTotal gasto: R$ ${this.calcularTotal().toFixed(2)}`)
    }

    calcularTotal() {
        return this.gastos.reduce((total, gasto) => {
            return total + gasto.valor
        }, 0)
    }
}

// Criando o objeto do controle de gastos
const controle = new ControleDeGastos()

let continuar = true

while (continuar) {
    console.log("\n================================")
    console.log("       CONTROLE DE GASTOS")
    console.log("================================")

    console.log("\n1 - Adicionar gasto")
    console.log("2 - Listar gastos")
    console.log("3 - Ver total")
    console.log("4 - Sair")

    const opcao = prompt("\nEscolha uma opção: ")

    switch (opcao) {
        case "1":
            const descricao = prompt("O que você gastou? ")

            const valorDigitado = prompt("Quanto gastou? R$ ")
            const valor = Number(valorDigitado.replace(",", "."))

            if (isNaN(valor) || valor <= 0) {
                console.log("Valor inválido!")
            } else {
                controle.adicionarGasto(descricao, valor)
            }

            break

        case "2":
            controle.listarGastos()
            break

        case "3":
            console.log(
                `\nTotal gasto: R$ ${controle.calcularTotal().toFixed(2)}`
            )
            break

        case "4":
            console.log("\nPrograma encerrado. Até mais!")
            continuar = false
            break

        default:
            console.log("\nOpção inválida!")
    }
}
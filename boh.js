/**Crea un programma JavaScript che gestisce un inventario di prodotti di un negozio,
 *  utilizzando un array di oggetti per rappresentare l'inventario. Ogni prodotto che
 * è anche un oggetto è identificato da un codice univoco e ha inoltre le seguenti proprietà:
 *  nome, prezzo e quantità disponibile.
 * Occorre realizzare le funzioni che  permettono di aggiungere,
 *  rimuovere e aggiornare i prodotti dell'inventario.
 *  Oltre alla gestione degli elementi dell'inventario,
 *  viene richiesto anche il calcolo del valore totale dell'inventario,
 *  che consiste nel prezzo di ogni prodotto moltiplicato per la quantità disponibile e
 *  sommato per tutti i prodotti dell'inventario. Un'altra funzione invece permette di capire
 *  quali sono i prodotti che sono da riordinare ossia quelli che hanno la quantità disponibile minore di 5 */

let inventario = [];

function agg_mod_prodotto() {
  const codice = document.getElementById("codice").value;
  const nome = document.getElementById("nome").value;
  const prezzo = parseFloat(document.getElementById("prezzo").value);
  const quantita = parseInt(document.getElementById("quantita").value);

  if (!codice || !nome || isNaN(prezzo) || isNaN(quantita)) {
    alert("Compila tutti i campi correttamente!");
    return;
  }

  const prod_esistente = inventario.find((prodotto) => prodotto.codice === codice);

  if (prod_esistente) {
    prod_esistente.nome = nome;
    prod_esistente.prezzo = prezzo;
    prod_esistente.quantita = quantita;
  } else {
    inventario.push({ codice, nome, prezzo, quantita });
  }

  aggiornaTabellaInventario();
  agg_stat();
}

function aggiornaTabellaInventario() {
    const body = document.getElementById("inventoryBody");
    body.innerHTML = ""; // Pulizia del contenuto esistente

    inventario.forEach(prodotto => {
        // Creazione della riga
        const row = document.createElement("tr");

        // Creazione delle celle
        const codiceCell = document.createElement("td");
        const nomeCell = document.createElement("td");
        const prezzoCell = document.createElement("td");
        const quantitaCell = document.createElement("td");
        const azioneCell = document.createElement("td");

        // Popolazione delle celle con i dati
        codiceCell.textContent = prodotto.codice;
        nomeCell.textContent = prodotto.nome;
        prezzoCell.textContent = `€${prodotto.prezzo.toFixed(2)}`;
        quantitaCell.textContent = prodotto.quantita;

        // Pulsante di rimozione
        const removeButton = document.createElement("button");
        removeButton.textContent = "Rimuovi";
        removeButton.onclick = () => canc_prodotto(prodotto.codice);
        azioneCell.appendChild(removeButton);

        // Aggiunta delle celle alla riga
        row.appendChild(codiceCell);
        row.appendChild(nomeCell);
        row.appendChild(prezzoCell);
        row.appendChild(quantitaCell);
        row.appendChild(azioneCell);

        // Aggiunta della riga al corpo della tabella
        body.appendChild(row);
    });
}

function canc_prodotto(codice) {
    const index = inventario.findIndex((prodotto) => prodotto.codice === codice);

    if (index !== -1) {
        inventario.splice(index, 1);
    }
  aggiornaTabellaInventario();
  agg_stat();
}

function calcola_val_totale() {
    let totale = 0;

    for (const prodotto of inventario) {
        totale += prodotto.prezzo * prodotto.quantita;
    }

    return totale;
}

function prod_da_rifornire() {
  return inventario.filter((prodotto) => prodotto.quantita < 5);
}

function agg_stat() {
  const val_totale = calcola_val_totale();
  const prod_da_rif = prod_da_rifornire();

  document.getElementById("val_totale").textContent = `Valore Totale: €${val_totale}`;
  document.getElementById("prod_da_rif").textContent =
    prod_da_rif.length > 0
      ? `Prodotti da Rifornire: ${prod_da_rif
          .map((p) => p.nome)
          .join(", ")}`
      : "Prodotti da Riordinare: Nessuno";
}


document.getElementById("agg_mod_prodotto").onclick = agg_mod_prodotto;

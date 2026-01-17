# banko-kontrolplade
En simpel, reklamefri og open-source banko-kontrolplade, som kan bruges sammen med en fysisk pose med numre.

## Sider

| Side | Beskrivelse |
|------|-------------|
| [Kontrolplade](index.html) | Hovedsiden til at styre banko-spillet |
| [Pladegenerator](generator.html) | Generer banko-plader til print |

## Funktioner

### Kontrolplade
- Klik på et tal for at markere det, klik igen for at fjerne markeringen.
- "Træk tal" knap til automatisk at trække et tilfældigt nummer.
- Viser en liste over alle markerede/udtrukne tal i den rækkefølge, de er klikket.
- Stort "Sidst trukket" display til deltagerne.
- Indeholder mulighed for manuelt valg af række (1, 2 eller 3).
- "Nyt spil" nulstiller hele pladen efter bekræftelse.

### Indstillinger
- **Temaer**: Vælg mellem Standard, Jul, Påske, Nytår, Fastelavn, Sommer, Halloween, Sankt Hans og Fest/Jubilæum.

### Pladegenerator
- Generer banko-plader klar til print (3 pr. A4-side).
- Vælg antal plader.
- Gem som PDF via browserens print-funktion.

## Datalagring

### Hvad gemmes lokalt
Følgende indstillinger gemmes i browserens localStorage:
- Valgt tema
- Om indstillingspanelet er åbent/lukket

### Hvad gemmes IKKE
- Spildata (trukne numre) – nulstilles ved refresh
- Ingen data sendes til servere
- Ingen cookies

### Slet gemte data
For at slette alle gemte indstillinger:
1. Åbn browserens udviklerværktøjer (F12)
2. Gå til Application/Storage → Local Storage
3. Slet nøglen `banko-settings`

Eller kør i konsollen:
```javascript
localStorage.removeItem('banko-settings')
```

## Principper
- Ingen reklamer.
- Ingen tracking.
- Ingen cookies.
- Ingen tredjeparts-biblioteker.
- Ingen frameworks.
- Ingen installation nødvendig.
- Kører direkte i browseren.
- Optimeret til desktop og tablet.

## Open Source
Kildekoden er tilgængelig på [GitHub](https://jespervnielsen.github.io/banko-kontrolplade/)

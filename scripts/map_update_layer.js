// update layer
document.getElementById('listing-group').addEventListener('click', (e) => {

  // switch - récupère l'ID
  const handler = e.target.id;
  const layer = e.target.name

  // legend layer - récupère l'ID de la légende
  const legend = document.getElementById('legend-' + handler);

  // uncheck other elements
  const other_elem = document.getElementsByName("prix-ehpad")

  for (var index = 0; index < other_elem.length; index++) {
    if (other_elem[index].id != handler) {

      other_elem[index].checked = false;

      // remove other legends
      const legend_other = document.getElementById('legend-' + other_elem[index].id);
      legend_other.style.display = "none";
    }
  }

  if (e.target.checked) {
    // changer couleur
    map.setPaintProperty(layer, 'circle-color', ['get', handler + '_col']);

    // enlever les NA
    map.setFilter('prix-ehpad', [
      '!in',
      handler + '_col',
      "lightgrey"
    ]);

    // update legend visibility
    legend.style.display = "block";
  } 
  
  else {
    // change color
    map.setPaintProperty(layer, 'circle-color', "lightgrey");

    // remettre les NA
    map.setFilter('prix-ehpad', [
      '!in',
      handler + '_col',
      ''
    ]);

    // update legend visibility
    legend.style.display = "none";
  }
}
);
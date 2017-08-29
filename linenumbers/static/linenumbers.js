define([
  'base/js/namespace',
  'base/js/events'
], function (Jupyter,
             events) {
  function getCodeCells() {
    return Jupyter.notebook.get_cells().filter(function (cell) {
      return cell.cell_type === 'code'
    })
  }

  function setContinuousLineNumbering() {
    var last_line = 0
    $.each(getCodeCells(), function (index, item) {
      item.code_mirror.setOption('firstLineNumber', last_line + 1)
      last_line += item.code_mirror.lineCount()
    })
  }

  function setEventHandlers() {
    $.each(Jupyter.notebook.get_cells(), function (index, cell) {
      cell.code_mirror.off('change', setContinuousLineNumbering)
      cell.code_mirror.on('change', setContinuousLineNumbering)
    })
  }

  function load_ipython_extension() {
    setEventHandlers()

    events.on('create.Cell', function() {
      setEventHandlers()
      setContinuousLineNumbering()
    })

    events.on('delete.Cell', setContinuousLineNumbering)
    events.on('selected_cell_type_changed.Notebook', setContinuousLineNumbering)

    setContinuousLineNumbering()
  }

  return {
    load_ipython_extension: load_ipython_extension
  }
})

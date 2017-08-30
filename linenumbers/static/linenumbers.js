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

  function areLineNumbersEnabled() {
    var codeCells = getCodeCells()
    for (var cellIdx in codeCells) {
      if (!codeCells[cellIdx].code_mirror.getOption('lineNumbers')) {
        return false
      }
    }
    return true
  }

  function enableLineNumbers() {
    const patch = {
      CodeCell: {
        cm_config: {
          lineNumbers: true
        }
      }
    }
    Jupyter.notebook.config.update(patch)

    // Also need to set it now, as the patched config does not apply immediately
    $.each(getCodeCells(), function (index, cell) {
      cell.code_mirror.setOption('lineNumbers', true)
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
    if (!areLineNumbersEnabled()) {
      console.warn('jupyter-linenumbers extension enabled, but global lineNumbers are not enabled. Patching the ' +
        'configuration...')
      enableLineNumbers()
    }

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

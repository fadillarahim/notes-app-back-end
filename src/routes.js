const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  // Untuk Menyimpan Catatan
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },

  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },

  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },

  // Untuk Mengedit Catatan
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },

  // Untuk Menghapus catatan
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;

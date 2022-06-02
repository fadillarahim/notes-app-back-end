const { nanoid } = require('nanoid');
const notes = require('./notes');

// Logika untuk menyimpan Catatan
const addNoteHandler = (request, h) => {
  // Mendapatkan body request
  const { title, tags, body } = request.payload;

  // untuk mendapatkan ID unik menggunakan Module nanoid
  const id = nanoid(16);
  // untuk menetapkan waktu pembuatan dan pengeditan(Nilainya sama)
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  // Masukkan nilai nilai pada newNote kedalam array notes
  notes.push(newNote);

  // Menentukan apakah sudah masuk kedalam array
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Untuk Mengedit Catatan
const editNoteByIdHandler = (request, h) => {
  // Untuk mendapatkan nilai ID
  const { id } = request.params;

  // Mendapatkan  Data notes terbaru yg dikirim oleh client melalui body request
  const { title, tags, body } = request.payload;
  // mendapatkan nilai terbaru kapan di update atau diedit
  const updatedAt = new Date().toISOString();

  // MENGUBAH NILAI CTATATN LAMA DENGAN NILAI YG BARU
  // mendapatkan index ctt sesuai ID nya
  const index = notes.findIndex((note) => note.id === id);
  // Logika jika ditemukan dan tidak ditemukan
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Fungsi Untuk Menhapus Catatan
const deleteNoteByIdHandler = (request, h) => {
  // Untuk mendapatkan nilai ID
  const { id } = request.params;

  // mendapatkan index ctt sesuai ID nya
  const index = notes.findIndex((note) => note.id === id);

  // Melakukan Pengecekan index
  // Bila berhasil atau ada
  if (index !== -1) {
    // Menghapus data pada array menggunakan method splice
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  // Bila Gagal
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};

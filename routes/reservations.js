const { index, show, new: _new, edit, create, update, delete: _delete } = require('../controllers/ReservationsController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
  router.get('/reservations', auth, index);
  router.get('/reservations/new', auth, _new);
  router.get('/reservations/:id', auth, show);
  router.get('/reservations/:id/edit', auth, edit);
  router.post('/reservations', auth, create);
  router.post('/reservations/update', auth, update);
  router.post('/reservations/delete', auth, _delete);
};
const Reservation = require('../models/reservation');
const User = require('../models/user');
const viewPath = 'reservations';
const restaurants = Reservation.schema.paths.restaurant.enumValues;

exports.index = async (req, res) => {
  try {
    const user = await User.findOne({email: req.session.passport.user});
    const reservations = await Reservation.find({user: user._id})
      .populate('user');

    res.render(`${viewPath}/index`, {
      pageTitle: 'Your Reservations',
      reservations
    });
  } catch (error) {
    req.flash('danger', 'There was an issue finding your reservations.');
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('user');

    res.render(`${viewPath}/show`, {
      pageTitle: 'Reservation',
      reservation
    });
  } catch (error) {
    req.flash('danger', 'There was an issue with finding this reservation.');
    res.redirect('/');
  }
};

exports.new = async (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Reservation',
    restaurants
  });
};

exports.edit = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    
    res.render(`${viewPath}/edit`, {
      pageTitle: 'Reservation',
      restaurants,
      formData: reservation
    });
  } catch (error) {
    req.flash('danger', 'There was an issue with finding this reservation.');
    res.redirect('/');
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.findOne({email: req.session.passport.user});
    const attributes = {user: user._id, ...req.body};
    const reservation = await Reservation.create(attributes);

    req.flash('success', 'Your reservation was created successfully.');
    res.redirect(`/${viewPath}/${reservation.id}`);
  } catch (error) {
    console.error(error);
    req.flash('danger', 'There was an issue with creating this reservation.');
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findOne({email: req.session.passport.user});
    const reservation = await Reservation.findById(req.body.id);
    if (!reservation) throw new Error('Reservation could not be found');

    const attributes = {user: user._id, ...req.body};
    await Reservation.validate(attributes);
    await Reservation.updateOne({_id: req.body.id}, req.body);

    req.flash('success', 'This reservation was updated successfully');
    res.redirect(`/${viewPath}/${reservation.id}`);
  } catch (error) {
    req.flash('danger', 'There was an issue with updating this reservation.');
    res.redirect(`/${viewPath}`);
  }
};

exports.delete = async (req, res) => {
  try {
    await Reservation.deleteOne({_id: req.body.id});

    req.flash('success', 'The reservation was delete successfully.');
    res.redirect(`/${viewPath}`);
  } catch (error) {
    req.flash('danger', 'There was an issue with deleting this reservation.');
    res.redirect(`/${viewPath}`);
  }
};

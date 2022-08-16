const router = require('express').Router();
const {
  models: { User },
} = require('../db');


router.get('/unassigned', async(req,res, next) => {
  try {
    const unassigned = await User.findUnassignedStudents();
    res.send(unassigned);
  }
  catch(e){
    next(e)
  }
})

router.get('/teachers',async(req,res,next)=>{
  try {
    const teacher = await User.findTeachersAndMentees();
    res.send(teacher)
  }
  catch(e){
    next(e)
  }
})

router.delete('/:id', async (req, res,next) => {
  try {
    let id = Number(req.params.id);
  if (id) {
    let user = await User.findByPk(id);
    if ( !user ) {
      res.status(404).send()
    } else {
      await User.destroy({
        where: {
          id: id
        }
      })
      res.status(204).send()
    }
  } else {
    res.sendStatus(400)
  }
  }
  catch(e){
    next(e)
  }
})

router.post('/',async(req,res,next) => {
  try {
    const [row, created] = await User.findOrCreate({
      where: {
        name: req.body.name
      }
    });
    if (created) {
      res.status(201).send(row)
    } else {
      res.status(409).send();
    }
  }
  catch(e){
    next(e)
  }
})

router.put('/:id', async(req,res,next) =>{
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.sendStatus(404)
    } else {
      const updated = await user.update(req.body);
      res.status(200).send(updated)
    }
  }
  catch(e){
    next(e)
  }
})

//router.get('/')



/**
 * All of the routes in this are mounted on /api/users/
 * For instance:
 *
 * router.get('/hello', () => {...})
 *
 * would be accessible on the browser at http://localhost:3000/api/users/hello
 *
 * These route tests depend on the User Sequelize Model tests. However, it is
 * possible to pass the bulk of these tests after having properly configured
 * the User model's name and userType fields.
 */

// Add your routes here:

module.exports = router;

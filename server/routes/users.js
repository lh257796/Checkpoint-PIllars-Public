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

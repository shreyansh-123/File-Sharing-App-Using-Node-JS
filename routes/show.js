const router = require('express').Router();
const Register = require('../register');

router.get('/:uuid', async (req, res) => {
    try {
        const data = await Register.findOne({uuid: req.params.uuid})
        if(!data) {
            console.log("error");
        }
        else {
            console.log(data);
            res.render('download', {
                uuid: data.uuid,
                filename: data.filename,
                filesize: data.size,
                download: data.uuid
            })
        }
    }
    catch(e) {
        console.log(e);
    }
})

module.exports = router;
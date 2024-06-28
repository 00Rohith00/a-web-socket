import { router } from "../application/base.router.js";
const socketRouter = router;


socketRouter.get('/', (req, res) => { res.send("Response : server is up and running") })



export default socketRouter
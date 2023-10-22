import userRoute from './user.route';
import staffRoute from './staff.route';
function route(app: any) {
    app.use('/api/v1/user', userRoute);
    app.use('/api/v1/staff', staffRoute);
}
export default route;

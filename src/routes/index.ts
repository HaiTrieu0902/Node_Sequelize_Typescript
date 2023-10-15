import userRoute from './user.route';
function route(app: any) {
    app.use('/api/v1/user', userRoute);
}
export default route;

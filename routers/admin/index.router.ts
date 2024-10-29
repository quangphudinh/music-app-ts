import { Express } from 'express';
import { dashboardRoutes } from './dashboard.router';
import { systemConfig } from '../../config/config';

const adminRoutes = (app : Express) : void => {
    const PATH_ADMIN  = `/${systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard` , dashboardRoutes);
}

export default adminRoutes
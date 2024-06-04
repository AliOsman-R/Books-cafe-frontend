import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/GlobalContext';
import { httpRequest } from '../utils/httpsRequest';

const useIsAdminAuth = () => {
    const [adminLoading, setAdminLoading] = useState(true);
    const {actions} = useContext(Context)

    useEffect(() => {
        console.log('run')
        httpRequest
          .get("/admin/is-admin-auth")
          .then((res) => {
            console.log(res.data)
            if (res.data.adminAuth) {
              actions({type:'SET_ADMIN', payload:res.data.admin});
            }
            actions({type:'SET_IS_ADMIN_AUTH', payload:res.data.adminAuth});
            console.log("res: ", res);
          })
          .catch((err) => {
            actions({type:'SET_ADMIN', payload:{}});
            actions({type:'SET_IS_ADMIN_AUTH', payload:false});
            console.log(err);
          })
          .finally(() => {
            setAdminLoading(false);
          });
      }, []);

    return {adminLoading}
}

export default useIsAdminAuth
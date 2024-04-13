import { useEffect, useState } from 'react';
import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import FeatureCottage from './featured/FeatureCottage';
import FeatureRoom from './featured/FeatureRoom';

const Featured = ({ pathname }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/landing/active-rooms',
            setDataDirectly: setData,
            setLoading
        })
    }, []);

    return (
        <>
            {
                pathname === '/' ?
                    <>
                        <FeatureRoom data={data} loading={loading} inLanding />
                        <FeatureCottage data={data} loading={loading} inLanding />
                    </> : pathname === '/rooms' ?
                        <FeatureCottage data={data} loading={loading} /> :
                        <FeatureRoom data={data} loading={loading} />
            }
        </>
    );
}

export default Featured;



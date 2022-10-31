import { Suspense } from 'react';
import { Layout } from '@fast-api/ui/components';
import { FeatureContentManagerment } from '@fast-api/feature/content-managerment';
import { FeatureTableManagerment } from '@fast-api/feature/table-managerment';
import {
  FeatureApiManagerment,
  FeatureApiEndpointSettings,
} from '@fast-api/feature/api-managerment';
const routes = () => [
  {
    path: '/',
    element: (
      <Suspense fallback={'Loading...'}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: 'databases',
        element: (
          <Suspense fallback={'Loading...'}>
            <FeatureTableManagerment />
          </Suspense>
        ),
      },
      {
        path: 'databases/:id/contents',
        element: (
          <Suspense fallback={'Loading...'}>
            <FeatureContentManagerment />
          </Suspense>
        ),
      },
      {
        path: 'endpoints',
        element: (
          <Suspense fallback={'Loading...'}>
            <FeatureApiManagerment />
          </Suspense>
        ),
      },
      {
        path: 'endpoints/:id',
        element: (
          <Suspense fallback={'Loading...'}>
            <FeatureApiEndpointSettings />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;

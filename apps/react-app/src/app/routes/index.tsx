import { Suspense } from 'react';
import { Layout } from '@fast-api/ui/components';
import { FeatureContentManagerment } from '@fast-api/feature/content-managerment';
import { FeatureTableManagerment } from '@fast-api/feature/table-managerment';

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
    ],
  },
];

export default routes;

import './App.scss';

// JSON viewer component
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { useUpdateCall } from '@ic-reactor/react';

function App() {
  const { data, error, loading, call } = useUpdateCall({
    functionName: 'getLatestEthereumBlock',
  });

  return (
    <div className="App">
      <h1 style={{ paddingLeft: 36 }}>ETH Block Explorer</h1>
      <div>
                <div>
                    <div className="p-8 space-y-6">
                        <p className="text-gray-600 leading-relaxed">
                            This project shows how an ICP smart contract can query data directly from Ethereum without using a bridge or oracle.
                        </p>
                        <h3 className="text-xl font-semibold">Key Features:</h3>
                        <ul className="space-y-3">A React frontend and Motoko-based backend fully deployed on ICP.</ul>
                        <ul className="space-y-3">A direct call to the Ethereum network using HTTPS outcalls.</ul>
                        <ul className="space-y-3">A frontend that displays the latest Ethereum block details.</ul>
                    </div>
                </div>
        </div>
      <div className="card" style={{ opacity: loading ? 0.5 : 1 }}>
        <button onClick={call} disabled={loading}>
          Get the latest Ethereum block
        </button>
        {!!data && (
          <pre className="json-view">
            <JsonView
              data={data}
              shouldExpandNode={allExpanded}
              style={{ ...defaultStyles, container: '' }}
            />
          </pre>
        )}
        {!!error && (
          <pre style={{ textAlign: 'left', color: 'grey' }}>
            {error.message}
          </pre>
        )}
        {!!loading && !data && !error && <div className="loader" />}
      </div>
      <p className="read-the-docs">
      </p>
    </div>
  );
}

export default App;

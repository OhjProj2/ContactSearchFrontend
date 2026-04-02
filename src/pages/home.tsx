
import "../styles/HeroUITheme.css"
import { InputPanel } from '../components/InputPanel';
import { useContactSearch } from '../hooks/useContactSearch';
import { OutputPanel } from "../components/OutputPanel";


function Home() {
  
  const {results, loading, search} = useContactSearch();
  
  
  return (
    <>
      <div className="gap-6 flex flex-col max-w-7xl mx">
        <InputPanel
        search={search}
        />

        <OutputPanel
        results={results}
        loading={loading}/>
      </div>
    </>
  );
}

export default Home;
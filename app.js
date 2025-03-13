const ItemGroupMatcher = () => {
  const initialGroups = [
    { id: 1, name: 'Zeri Watchers', items: ['Amumu', 'Zeri', 'KogMaw', 'Scar', 'Ekko', 'Garen'] },
    { id: 2, name: 'Twitch Experiment', items: ['Urgot', 'Nunu & Willump', 'Elise', 'Vi', 'Dr. Mundo', 'Twitch', 'Caitlyn', 'Mordekaiser'] },
    { id: 3, name: 'Quickstrikers Reroll', items: ['Irelia', 'Akali', 'Nocturne', 'Rell', 'Loris', 'Twisted Fate', 'Illaoi'] },
    { id: 4, name: 'Enforcers', items: ['Maddie', 'Steb', 'Camille', 'Loris', 'Twisted Fate', 'Illaoi', 'Vi', 'Caitlyn'] },
    { id: 5, name: 'Family', items: ['Draven', 'Violet', 'Powder', 'Darius', 'Urgot', 'Vander', 'Vi', 'Gangplank', 'Sevika'] },
    { id: 6, name: 'Chem Barons', items: ['Singed', 'Renata Glasc', 'Smeech', 'Renni', 'Nunu & Willump', 'Silcoo', 'Dr. Mundo', 'Twitch', 'Sevika'] },
    { id: 7, name: 'Ambusher', items: ['Powder', 'Violet', 'Camille', 'Vander', 'Smeech', 'Scar', 'Ekko', 'Jinx'] },
    { id: 8, name: 'Black Rose', items: ['Morgana', 'Vladimir', 'Cassiopeia', 'Nunu & Willump', 'Elise', 'Silco', 'Dr. Mundo', 'LeBlanc', 'Mordekaiser'] },
    { id: 9, name: 'Rebels', items: ['Irelia', 'Akali', 'Sett', 'Ezreal', 'Zoe', 'Illaoi', 'Jinx', 'LebBlanc', 'Viktor'] },
    { id: 10, name: 'Renata', items: ['Singed', 'Irelia', 'Vex', 'Morgana', 'Renata Glasc', 'Rell', 'Illaoi'] },
    { id: 11, name: 'Tristana', items: ['Urgot', 'Tristana', 'Ezreal', 'Nami', 'Scar', 'Ambessa', 'Corki', 'Garen'] },
    { id: 12, name: 'Conqueror', items: ['Darius', 'Draven', 'Rell', 'Gangplank', 'Swain', 'Ambessa', 'Vi', 'Sevika', 'Mordekaiser'] },
    { id: 13, name: 'Scrappers', items: ['Powder', 'Trundle', 'Tristana', 'Gangplank', 'Corki', 'Ekko', 'Elise', 'Rumble'] },
    { id: 14, name: 'Sentinel', items: ['Irelia', 'Leona', 'Rell', 'Loris', 'Ezreal', 'Corki', 'Heimerdinger', 'Illaoi', 'Rumble'] },
    { id: 15, name: 'Visionary', items: ['Morgana', 'Vex', 'Rell', 'Renata Glasc', 'Nunu & Willump', 'Elise', 'Heimerdinger', 'Illaoi', 'Malzahar'] },
    { id: 16, name: '4 Emisssary', items: ['Tristana', 'Nami', 'Twisted Fate', 'Swain', 'Gangplank', 'Garen', 'Ambessa', 'Corki'] },
    { id: 17, name: 'Pit Fighter', items: ['Draven', 'Urgot', 'Elise', 'Swain', 'Gangplank', 'Vi', 'Sevika', 'Rumble'] },
    { id: 18, name: 'Sorcerer', items: ['Lux', 'Zyra', 'Vladimir', 'Nami', 'Swain', 'Elise', 'Zoe', 'Leblanc'] },
    { id: 19, name: 'Black Rose Visionary', items: ['Morgana', 'Vladimir', 'Nunu & Willump', 'Cassiopeia', 'Elise', 'Garen', 'Heimerdinger', 'LeBlanc', 'Malzahar'] },
  
  ];

  const itemCategories = {
   "1 Cost": ["Amumu", "Darius", "Draven", "Irelia", "Lux", "Maddie", "Morgana", "Powder", "Singed", "Steb", "Trundle", "Vex", "Violet", "Zyra"],
   "2 Cost": ["Akali", "Camille", "Leona", "Nocturne", "Rell", "Renata Glasc", "Sett", "Tristana", "Urgot", "Vander", "Vladimir", "Zeri", "Ziggs"],
   "3 Cost": ["Blitzcrank", "Cassiopeia", "Ezreal", "Gangplank", "KogMaw", "Loris", "Nami", "Nunu & Willump", "Renni", "Scar", "Smeech", "Swain", "Twisted Fate"],
   "4 Cost": ["Ambessa", "Corki", "Dr. Mundo", "Ekko", "Elise", "Garen", "Heimerdinger", "Silco", "Illaoi", "Twitch", "Vi", "Zoe"],
   "5 Cost": ["Caitlyn", "Jayce", "Jinx", "LeBlanc", "Malzahar", "Mordekaiser", "Sevika", "Rumble"]
 };

  const [groups] = React.useState(initialGroups);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [matchingGroups, setMatchingGroups] = React.useState([]);

  const getAllUniqueItems = () => {
    return Object.entries(itemCategories).map(([category, items]) => ({
      category,
      items
    }));
  };

  const allCategorizedItems = getAllUniqueItems();

  const toggleItem = (item) => {
    setSelectedItems(selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item]);
  };

  const findMatchingGroups = () => {
    if (selectedItems.length === 0) return;

    const results = groups.map(group => {
      const matchedItems = selectedItems.filter(item => group.items.includes(item));
      const missingItems = group.items.filter(groupItem => !selectedItems.includes(groupItem));
      const matchPercentage = (matchedItems.length / group.items.length) * 100;
      return { group, matchedItems, missingItems, matchPercentage };
    });

    setMatchingGroups(results.filter(result => result.matchedItems.length > 0).sort((a, b) => b.matchPercentage - a.matchPercentage));
  };

  React.useEffect(() => {
    findMatchingGroups();
  }, [selectedItems]);
  return (
    <TFTCompSearch
      allCategorizedItems={allCategorizedItems}
      selectedItems={selectedItems}
      matchingGroups={matchingGroups}
      toggleItem={toggleItem}
    />
  );
};

const TFTCompSearch = ({ allCategorizedItems, selectedItems, matchingGroups, toggleItem }) => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-4 mx-auto">
      {/* ... (your TFTCompSearch component code) */}
      <h1 className="text-3xl font-bold mb-6 text-purple-400">TFT Comp Search</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Right Side: Selected Items */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-blue-300">Select Units You Have</h2>
          {allCategorizedItems.map(({ category, items }) => (
            <div key={category} className="mb-4">
              <h3 className="font-semibold mb-2 text-gray-300">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <button
                    key={item}
                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                      selectedItems.includes(item)
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                    onClick={() => toggleItem(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Left Side: Matching Groups */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-2 text-green-300">Matching Groups</h2>
          {matchingGroups.length > 0 ? (
            <div className="space-y-4">
              {matchingGroups.map((result) => (
                <div key={result.group.id} className="border border-gray-700 rounded-lg p-3 bg-gray-800 shadow-md">
                  <h3 className="text-lg font-medium text-white">{result.group.name}</h3>
                  <p className="text-sm text-gray-400">Matched: {result.matchedItems.join(', ')}</p>
                  <p className="text-sm text-red-400">Missing: {result.missingItems.join(', ')}</p>
                  <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
                    {result.matchPercentage.toFixed(0)}% Complete
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No matching groups found. Try selecting some items.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ItemGroupMatcher />);

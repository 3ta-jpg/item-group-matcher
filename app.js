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
    { id: 13, name: 'Scrappers', items: ['Powder', 'Trundle', 'Tristana', 'Gangplank', 'Corki', 'Ekko', 'Elise', 'Rumble'] }
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
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">TFT Comp Search</h1>
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Select Units You Have</h2>
        {allCategorizedItems.map(({ category, items }) => (
          <div key={category} className="mb-4">
            <h3 className="font-semibold mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <button
                  key={item}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedItems.includes(item) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
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
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Matching Groups</h2>
        {matchingGroups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {matchingGroups.map((result) => (
              <div key={result.group.id} className="border rounded-lg p-3 bg-white shadow-md">
                <h3 className="text-lg font-medium">{result.group.name}</h3>
                <p className="text-sm text-gray-600">Matched: {result.matchedItems.join(', ')}</p>
                <p className="text-sm text-red-600">Missing: {result.missingItems.join(', ')}</p>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
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
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ItemGroupMatcher />);

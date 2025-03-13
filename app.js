const ItemGroupMatcher = () => { 
  const initialGroups = [
    { id: 1, name: 'Zeri Watchers', items: ['Amumu', 'Zeri', 'KogMaw', 'Scar', 'Ekko','Garen'] },
    { id: 2, name: 'Twitch Experiment', items: ['Urgot', 'Nunu & Willump', 'Elise', 'Vi', 'Dr. Mundo','Twitch','Caitlyn','Mordekaiser'] },
    { id: 3, name: 'Quickstrikers Reroll', items: ['Irelia', 'Akali', 'Nocturne', 'Rell', 'Loris', 'Twisted Fate', 'Illaoi'] },
    { id: 4, name: 'Enforcers', items: ['Maddie', 'Steb', 'Camille', 'Loris', 'Twisted Fate', 'Illaoi', 'Vi', 'Caitlyn'] }
  ];

  const [groups] = React.useState(initialGroups);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [matchingGroups, setMatchingGroups] = React.useState([]);

  const getAllUniqueItems = () => {
    const allItems = new Set();
    groups.forEach(group => {
      group.items.forEach(item => {
        allItems.add(item);
      });
    });
    return Array.from(allItems).sort();
  };

  const allUniqueItems = getAllUniqueItems();

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
      <h1 className="text-2xl font-bold mb-6">Item Group Matcher</h1>
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Select Items You Have</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {allUniqueItems.map((item) => (
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

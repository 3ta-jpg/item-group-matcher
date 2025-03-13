const ItemGroupMatcher = () => {
  // Sample data structure for groups and their items - this would be managed on the backend
  const initialGroups = [
    { id: 1, name: 'Breakfast Foods', items: ['Eggs', 'Bacon', 'Toast', 'Pancakes', 'Orange Juice'] },
    { id: 2, name: 'Baking Essentials', items: ['Flour', 'Sugar', 'Eggs', 'Butter', 'Vanilla'] },
    { id: 3, name: 'Italian Dinner', items: ['Pasta', 'Tomato Sauce', 'Garlic', 'Parmesan', 'Olive Oil'] },
    { id: 4, name: 'Taco Night', items: ['Tortillas', 'Ground Beef', 'Cheese', 'Lettuce', 'Salsa'] }
  ];

  const [groups] = React.useState(initialGroups);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [matchingGroups, setMatchingGroups] = React.useState([]);

  // Get unique items from all groups
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

  // Toggle selected item
  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Find which groups contain the selected items
  const findMatchingGroups = () => {
    if (selectedItems.length === 0) return;
    
    const results = groups.map(group => {
      const matchedItems = selectedItems.filter(item => 
        group.items.includes(item)
      );
      
      const missingItems = group.items.filter(groupItem => 
        !selectedItems.includes(groupItem)
      );
      
      const matchPercentage = (matchedItems.length / group.items.length) * 100;
      
      return {
        group,
        matchedItems,
        missingItems,
        matchPercentage
      };
    });
    
    // Filter for groups that have at least one matching item
    const matching = results.filter(result => result.matchedItems.length > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    setMatchingGroups(matching);
  };

  // Find matches automatically when selections change
  React.useEffect(() => {
    findMatchingGroups();
  }, [selectedItems]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Item Group Matcher</h1>
      
      {/* Item selection section */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Select Items You Have</h2>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {allUniqueItems.map((item) => (
              <button
                key={item}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedItems.includes(item)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => toggleItem(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium">Selected Items ({selectedItems.length}):</p>
            <p className="text-sm text-gray-600">
              {selectedItems.length > 0 ? selectedItems.join(', ') : 'No items selected'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Results section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Matching Groups</h2>
        {matchingGroups.length > 0 ? (
          <div className="space-y-4">
            {matchingGroups.map((result) => (
              <div key={result.group.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">{result.group.name}</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {result.matchPercentage.toFixed(0)}% Complete
                  </span>
                </div>
                <div className="mb-2">
                  <p className="text-sm text-gray-600 mb-1">Matched Items:</p>
                  <p className="text-sm">{result.matchedItems.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Missing Items to Complete:</p>
                  <p className="text-sm font-medium text-red-600">{result.missingItems.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No matching groups found. Try selecting some items.</p>
        )}
      </div>
      
      {/* All groups section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Available Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div key={group.id} className="border p-3 rounded-lg">
              <h3 className="font-medium">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.items.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ItemGroupMatcher />);

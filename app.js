const ItemGroupMatcher = () => {
  // Sample data structure for groups and their items
  const initialGroups = [
    { id: 1, name: 'Breakfast Foods', items: ['Eggs', 'Bacon', 'Toast', 'Pancakes', 'Orange Juice'] },
    { id: 2, name: 'Baking Essentials', items: ['Flour', 'Sugar', 'Eggs', 'Butter', 'Vanilla'] },
    { id: 3, name: 'Italian Dinner', items: ['Pasta', 'Tomato Sauce', 'Garlic', 'Parmesan', 'Olive Oil'] },
    { id: 4, name: 'Taco Night', items: ['Tortillas', 'Ground Beef', 'Cheese', 'Lettuce', 'Salsa'] }
  ];

  const [groups, setGroups] = React.useState(initialGroups);
  const [inputItems, setInputItems] = React.useState('');
  const [matchingGroups, setMatchingGroups] = React.useState([]);
  const [newGroupName, setNewGroupName] = React.useState('');
  const [newGroupItems, setNewGroupItems] = React.useState('');

  // Find which groups contain the input items
  const findMatchingGroups = () => {
    const items = inputItems.split(',').map(item => item.trim()).filter(item => item !== '');
    
    if (items.length === 0) return;
    
    const results = groups.map(group => {
      const matchedItems = items.filter(item => 
        group.items.some(groupItem => 
          groupItem.toLowerCase() === item.toLowerCase()
        )
      );
      
      const missingItems = group.items.filter(groupItem => 
        !items.some(item => 
          item.toLowerCase() === groupItem.toLowerCase()
        )
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

  // Add a new group
  const addNewGroup = () => {
    if (newGroupName.trim() === '' || newGroupItems.trim() === '') return;
    
    const items = newGroupItems.split(',').map(item => item.trim()).filter(item => item !== '');
    
    if (items.length === 0) return;
    
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      items: items
    };
    
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setNewGroupItems('');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Item Group Matcher</h1>
      
      {/* Input section */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Enter Items You Have</h2>
        <div className="flex gap-2">
          <textarea
            className="border rounded p-2 flex-grow"
            placeholder="Enter items separated by commas (e.g., Eggs, Flour, Sugar)"
            value={inputItems}
            onChange={(e) => setInputItems(e.target.value)}
            rows={2}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={findMatchingGroups}
          >
            Find Matches
          </button>
        </div>
      </div>
      
      {/* Results section */}
      {matchingGroups.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Matching Groups</h2>
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
        </div>
      )}
      
      {/* Add new group section */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Group</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Group Name</label>
            <input
              type="text"
              className="border rounded p-2 w-full"
              placeholder="E.g., Smoothie Ingredients"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Items (comma separated)</label>
            <textarea
              className="border rounded p-2 w-full"
              placeholder="E.g., Banana, Yogurt, Berries, Honey, Ice"
              value={newGroupItems}
              onChange={(e) => setNewGroupItems(e.target.value)}
              rows={2}
            />
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={addNewGroup}
          >
            Add Group
          </button>
        </div>
      </div>
      
      {/* All groups section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Groups</h2>
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

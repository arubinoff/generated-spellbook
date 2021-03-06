(function() {
  var app = angular.module( 'spells', [] );

  var concepts = [
    {name: 'money', positive: true, traits: ['metal','light','green','weight']},
    {name: 'love', positive: true, traits: ['red','softness','light','growth','happiness']},
    {name: 'luck', positive: true, traits: ['light','green','growth','happiness']},
    {name: 'fortune', positive: true, traits: ['light','gold','growth','music']},
    {name: 'health', positive: true, traits: ['calm','blue','soothing','growth']},
    {name: 'peace', positive: true, traits: ['music','calm','white','stillness']},
    {name: 'joy', positive: true, traits: ['music','light','gold','happiness']},
    {name: 'calm', positive: true, traits: ['calm','soothing','blue','stillness']},
    {name: 'strength', positive: true, traits: ['growth','metal','weight','support']},
    {name: 'work', positive: true, traits: ['growth','weight','support','happiness']},
    //the traits of negative things are the opposite of the things themselves
    {name: 'stress', positive: false, traits: ['light','growth','space','time']},
    {name: 'sorrow', positive: false, traits: ['happiness','light','growth','music']},
    {name: 'fatigue', positive: false, traits: ['rest','calm','space','light']},
    {name: 'hunger', positive: false, traits: ['weight','growth','food','gold']},
    {name: 'ill luck', positive: false, traits: ['light','green','growth','happiness']},
    {name: 'bad fortune', positive: false, traits: ['light','gold','growth','music']},
    {name: 'negative influences', positive: false, traits: ['growth','space','happiness','support']},
    {name: 'enemies', positive: false, traits: ['growth','heaviness','metal','space']}
  ]

  var traitsToIngredients = {
    'metal' : ['coin','red wine','mirror','ring','silver'],
    'light' : ['candle','mirror','gold','crystal'],//'eye'],
    'green' : ['green','basil','olive oil','thyme','clover'],
    'weight' : ['stone','dish','grey','black'],
    'blue' : ['blue','water','milk','marble'],
    'calm' : ['silk','water','pearl','cotton','incense'],
    'food' : ['bread','cake','cookie','apple','biscuit', 'vanilla'],
    'gold' : ['gold','coin','necklace','ring'],
    'growth' : ['rose oil','lavender oil','plant','fern','crystal','rose','daisy','basil','thyme','tulip','clover'],
    'happiness' : ['gold','candle','cookie','rose','white wine','glitter','rose oil','lemon oil'],
    'heaviness' : ['coin','paperweight','dish','small statue'],
    'music' : ['musical instrument','radio','glitter','bell','rattle'],
    'red' : ['red','rose','blood','red wine','ruby','rose oil'],
    'rest' : ['linen','cotton','doll','white','lavender oil'],
    'softness' : ['linen','silk','cotton','felt','wool'],
    'soothing' : ['linen','musical instrument','candle','blue','white wine','lavender oil'],
    'space' : ['bowl','dish','glass','cup','crystal'],
    'stillness' : ['water','bowl','incense','crystal','white'],
    'support' : ['small statue','paperweight','dish','plant'],
    'time' : ['thyme','hourglass','plant','fern','rose','tulip'],
    'white' : ['white','white wine','linen','glass']
  }

  var namesToObjs = {
    'crystal' : {'name' : 'crystal', 'type' : 'object', 'canBeColored': true, prefix: ''},
    'coin' : { 'name' : 'coin',  'type' : 'object', 'canBeColored' : true, prefix:''},
    'red wine' : { 'name' : 'red wine',  'type' : 'liquid', 'canBeColored' : false, prefix:''},
    'white wine' : { 'name' : 'white wine',  'type' : 'liquid', 'canBeColored' : false, prefix:''},
    'mirror' : { 'name' : 'mirror',  'type' : 'object', 'canBeColored' : true, prefix:''},
    'ring' : { 'name' : 'ring',  'type' : 'object', 'canBeColored' : true, prefix:''},
    'silver' : { 'name' : 'silver',  'type' : 'color', 'canBeColored' : false, prefix:''},
    'green' : { 'name' : 'green',  'type' : 'color', 'canBeColored' : false, prefix:''},
    'gold' : { 'name' : 'gold',  'type' : 'color', 'canBeColored' : false, prefix:''},
    'candle' : { 'name' : 'candle',  'type' : 'object', 'canBeColored' : true, prefix:'', 'standalone' : 'Light the candle'},
    //'eye' : { 'name' : 'eye',  'type' : 'symbol', 'canBeColored' : true, prefix:''},
    'basil' : { 'name' : 'basil',  'type' : 'powder', 'canBeColored' : false, prefix:''},
    'thyme' : { 'name' : 'thyme',  'type' : 'powder', 'canBeColored' : false, prefix:''},
    'olive oil' : { 'name' : 'olive oil', 'type' : 'liquid', 'canBeColored' : false, prefix:''},
    'stone' : { 'name' : 'stone',  'type' : 'object', 'canBeColored' : true, prefix:''},
    'dish' : { 'name' : 'dish',  'type' : 'object', 'canBeColored' : true, prefix:''},
    'grey' : { 'name' : 'grey',  'type' : 'color', 'canBeColored' : false, prefix:''},
    'black' : { 'name' : 'black',  'type' : 'color', 'canBeColored' : false, prefix:''},
    'clover' : { 'name' : 'clover', 'type' : 'object', 'canBeColored' : false, prefix:''},
    'apple' : { 'name' : 'apple', 'type' : 'object', 'canBeColored' : false, 'prefix' : ''},
    'bell' : { 'name' : 'bell', 'type' : 'object', 'canBeColored' : true, 'prefix' : '', 'standalone' : 'Ring the bell'},
    'biscuit' : { 'name' : 'biscuit', 'type' : 'object', 'canBeColored' : false, 'prefix' : ''},
    'blood' : { 'name' : 'blood', 'type' : 'liquid', 'canBeColored' : false, 'prefix' : ''},
    'blue' : { 'name' : 'blue', 'type' : 'color', 'canBeColored' : false, 'prefix' : ''},
    'bowl' : { 'name' : 'bowl', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'bread' : { 'name' : 'bread', 'type' : 'object', 'canBeColored' : false, 'prefix' : ''},
    'cake' : { 'name' : 'cake', 'type' : 'object', 'canBeColored' : false, 'prefix' : ''},
    'cookie' : { 'name' : 'cookie', 'type' : 'object', 'canBeColored' : false, 'prefix' : ''},
    'cotton' : { 'name' : 'cotton', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'cup' : { 'name' : 'cup', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'daisy' : { 'name' : 'daisy', 'type' : 'object', 'canBeColored' : false, 'prefix' : ''},
    'doll' : { 'name' : 'doll', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'felt' : { 'name' : 'felt', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'fern' : { 'name' : 'fern', 'type' : 'object', 'canBeColored' : false, 'prefix' : ''},
    'glass' : { 'name' : 'glass', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'glitter' : { 'name' : 'glitter', 'type' : 'powder', 'canBeColored' : true, 'prefix' : ''},
    'hourglass' : { 'name' : 'hourglass', 'type' : 'object', 'canBeColored' : false, 'prefix' : '', 'standalone' : 'Invert the hourglass'},
    'incense' : { 'name' : 'incense', 'type' : 'object', 'canBeColored' : false, 'prefix' : '', 'standalone' : 'Light the incense'},
    'linen' : { 'name' : 'linen', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'marble' : { 'name' : 'marble', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'milk' : { 'name' : 'milk', 'type' : 'liquid', 'canBeColored' : false, 'prefix' : ''},
    'musical instrument' : { 'name' : 'musical instrument', 'type' : 'object', 'canBeColored' : true, 'prefix' : '', 'standalone' : 'Play a tune on the instrument'},
    'necklace' : { 'name' : 'necklace', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'paperweight' : { 'name' : 'paperweight', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'pearl' : { 'name' : 'pearl', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'plant' : { 'name' : 'plant', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'radio' : { 'name' : 'radio', 'type' : 'object', 'canBeColored' : true, 'prefix' : '', 'standalone' : 'Set the radio to playing music'},
    'rattle' : { 'name' : 'rattle', 'type' : 'object', 'canBeColored' : true, 'prefix' : '', 'standalone' : 'Shake the rattle'},
    'red' : { 'name' : 'red', 'type' : 'color', 'canBeColored' : false, 'prefix' : ''},
    'rose' : { 'name' : 'rose', 'type' : 'object', 'canBeColored' : false, 'prefix' : ''},
    'ruby' : { 'name' : 'ruby', 'type' : 'object', 'canBeColored' : false, 'prefix' : ''},
    'silk' : { 'name' : 'silk', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'small statue' : { 'name' : 'small statue', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'tulip' : { 'name' : 'tulip', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'water' : { 'name' : 'water', 'type' : 'liquid', 'canBeColored' : false, 'prefix' : ''},
    'white' : { 'name' : 'white', 'type' : 'color', 'canBeColored' : false, 'prefix' : ''},
    'wool' : { 'name' : 'wool', 'type' : 'object', 'canBeColored' : true, 'prefix' : ''},
    'vanilla' : { 'name' : 'vanilla', 'type' : 'liquid', 'canBeColored' : false, 'prefix' : ''},
    'rose oil' : { 'name' : 'rose oil', 'type' : 'liquid', 'canBeColored' : false, 'prefix' : ''},
    'lavender oil' : { 'name' : 'lavender oil', 'type' : 'liquid', 'canBeColored' : false, 'prefix' : ''},
    'lemon oil' : { 'name' : 'lemon oil', 'type' : 'liquid', 'canBeColored' : false, 'prefix' : ''}
  }

  godNames = ['Lord','Lady','Master','Mistress','God','Goddess','Saint','Patron','Matron']

  positiveInvocations = [
    'Call out to the ^ of _',
    'Summon the ^ of _',
    'Beg the ^ of _ for favor',
    'Recite the ancient words of _',
    'Chant the chants of the ^',
    'Sing the ^ of _\'s songs'
  ];
  negativeInvocations = [
    'Reject the ^ of _',
    'Banish the ^ of _',
    'Beg the ^ of _ to spare you',
    'Recite the ancient words to dispel _',
    'Chant the chants of the ^',
    'Sing the songs the ^ of _ detests'
  ];

  var rndArr = function(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  var getSpellName = function(concept) {
    var positives = ['summon ','bring ','draw in ','call ','find ','discover ', 'gather ', 'draw '];
    var negatives = ['banish ','rid yourself of ','undo ','get rid of ','dispel ','drive away ', 'eliminate ', 'eradicate '];
    var verb = concept.positive ? rndArr(positives) : rndArr(negatives);
    return 'A spell to ' + verb + concept.name;
  }

  var getNewIngredient = function(trait,usedNames,canBeAdj) {
    var possIngs = traitsToIngredients[trait];
    possIngs = _.shuffle(possIngs);
    for(var i = 0; i < possIngs.length; i++) {
      var ing = possIngs[i];
      ing = namesToObjs[ing];
      var isAdj = ing.type === 'color';
      if((usedNames.indexOf(ing.name) === -1) && (canBeAdj || !isAdj) ) {
        return ing;
      }
    }
  }

  var getReason = function(trait) {
    //special handling for traits that are colors
    var obj = namesToObjs[trait];
    if(obj && obj.type === 'color') {
      return ' the color ' + trait;
    }
    return trait;
  }

  var getIngredients = function(concept) {
    var stuff = [];
    var colors = [];
    var canBeColored = [];
    for(var i = 0; i < concept.traits.length; i++) {
      var trait = concept.traits[i];
      var names = stuff.concat(colors.concat(canBeColored)).map(function(x) { return x.name; });
      var ing = getNewIngredient(trait, names, colors.length < canBeColored.length);
      if(!ing) { continue; }
      ing.reason = getReason(trait);
      if(ing.type === 'color' ) {
        if(trait === ing.name) {
          //eg, if blue represents the color blue, don't say that. go back to the original concept.
          ing.reason = concept.name;
        } else {
          ing.reason = trait;
        }
        colors.push(ing);
      } else if(ing.canBeColored) {
        canBeColored.push(ing);
      } else {
        stuff.push(ing);
      }
    }
    for(i = 0; i < canBeColored.length; i++) {
      if(colors[i]) {
        canBeColored[i].prefix = colors[i].name + ' ';
        canBeColored[i].prefixReason = colors[i].reason;
      }
      stuff.push(canBeColored[i]);
    }
    return _.shuffle(stuff);
  }

  var sortByType = function(a,b) {
    return a.type > b.type ? 1 : a.type < b.type ? -1 : 0;
  }

  var containers = ['bowl','cup','dish','glass'];

  var getStep = function(ing1,ing2) {
    var standalone = ing2.standalone; //if ing1 had a standalone it'd be processed already

    //types are: 'liquid', 'object', 'powder'
    var ings = [ing1,ing2].sort(sortByType);
    ing1 = ings[0];
    ing2 = ings[1];
    var step,newIng;

    if(ing1.type === 'liquid' && (ing2.type === 'liquid' || ing2.type === 'powder')){
      step = 'Mix the ' + ing1.name + ' and the ' + ing2.name;
      newIng = { 'name' : ing1.name + ' mixture',  'type' : 'liquid'};
    } else if(ing1.type === 'liquid' && ing2.type === 'object') {
      var prep = (containers.indexOf(ing2.name) > -1) ? 'into' : 'onto';
      var optionA = 'Pour the ' + ing1.name + ' ' + prep + ' the ' + ing2.name;
      var optionB = 'Annoint the ' + ing2.name + ' with the ' + ing1.name;
      step = rndArr([optionA, optionB]);
      newIng = { 'name' : ing2.name,  'type' : 'object'};
    } else if(ing1.type === 'object' && ing2.type === 'object') {
      if(containers.indexOf(ing1.name) > -1) {
        //swap them so stuff is being put /onto/ the container
        var tmp = ing1;
        ing1 = ing2;
        ing2 = tmp;
      }
      var prep = (containers.indexOf(ing2.name) > -1) ? 'into' : 'onto';
      var optionA = 'Place the ' + ing1.name + ' ' + prep + ' the ' + ing2.name;
      var optionB = 'Attach the ' + ing2.name + ' to the ' + ing1.name;
      step = rndArr([optionA, optionB]);
      newIng = { 'name' : ing1.name + ' and ' + ing2.name,  'type' : 'object'};
    } else if(ing1.type === 'object' && ing2.type === 'powder') {
      var prep = (containers.indexOf(ing1.name) > -1) ? 'into' : 'onto';
      step = 'Sprinkle the ' + ing2.name + ' ' + prep + ' the ' + ing1.name;
      newIng = { 'name' : ing1.name,  'type' : 'object'};
    } else if(ing1.type === 'powder' && ing2.type === 'powder') {
      step = 'Mix the ' + ing1.name + ' and the ' + ing2.name;
      newIng = { 'name' : ing1.name + ' mixture',  'type' : 'powder'};
    }
    if(standalone){ newIng.standalone = standalone; } 
    newIng.processed = true;
    return [step,newIng];
  }

  var getSteps = function(ingredients) {
    ingredients = _.shuffle(ingredients);
    var steps = [];
    while(ingredients.length > 0) {    
      //combine the ingredients 1 by 1
      var ing1 = ingredients.pop();
      if(ing1.standalone && !ing1.stoodAlone) {
        steps.push(ing1.standalone);
        if(ingredients.length === 1 && !ingredients[0].processed) {
          //we missed one ingredient still 
          ing1.stoodAlone = true;
          ingredients.push(ing1);
        }
      } else if(ingredients.length > 0) {
        var ing2 = ingredients.pop();
        var result = getStep(ing1,ing2);
        steps.push(result[0]);
        ingredients.push(result[1]);
      }
    }
    return steps;
  };

  var toUpperWord = function(word) {
    return word.substring(0,1).toUpperCase() + word.substring(1);
  }

  var toUpper = function(sentence){
    var arr = sentence.split(' ');
    var ret = [];
    for(var i = 0; i < arr.length; i++){
      ret.push(toUpperWord(arr[i]));
    }
    return ret.join(' ');
  };

  var getInvocation = function(concept) {
    var invocations = concept.positive ? positiveInvocations : negativeInvocations;
    return rndArr(invocations).replace('_',toUpper(concept.name)).replace('^',rndArr(godNames));
  }

  var getHistory = function(ingredients,concept) {
    var date = Math.ceil(Math.random() * 1000) + 1000;
    var spells = ['spell','enchantment','ritual','charm'];
    var books = ['manuscript','scroll','book','journal','parchment','codex'];
    var starts = [
      'This * dates from _. ',
      'This * was written in _. ',
      'This * was discovered in a # from _. ',
      'Written in _, this * was found in an old #. ',
      'Although discovered recently, the # containing this * dates from _. ',
      'This * is believed to date from _. ',
      'Scholars date this * to _. ',
      'Scholars believe this * dates from _. ',
      'Evidence of this * can be found as early as _.' ,
      'Written in _, this * was only discovered recently. ',
      'This is a * from _. ',
      'This * has been in use since _. ',
      'This * has been passed along by word of mouth since at least _. ',
      'In common use since _, this * was recently discovered in an ancient #. ',
    ];
    var included = ['', 'included ', 'meant ','in order '];
    var represent = ['symbolize','represent','bring to mind','stand for'];
    var represents = ['symbolizes','represents','brings to mind','stands for','is for','is included for'];
    var associated = ['associated with','connected to','reminiscent of'];
    var history = rndArr(starts)
        .replace('_',date)
        .replace('*',rndArr(spells))
        .replace('#',rndArr(books));
    for(var i = 0; i < ingredients.length; i++) {
      var ing = ingredients[i];
      var simpleForm = Math.floor(Math.random()*3) > 0;
      var midsection = simpleForm ? ' ' + rndArr(represents) : ' is ' + rndArr(included) + 'to ' + rndArr(represent);
      history += ('The ' + ing.name + midsection + ' ' + ing.reason + '. ');
      if(ing.prefix) {
        history += ('The color ' + ing.prefix + ' is ' + rndArr(associated) + ' ' + ing.prefixReason + '. ')
      }
    }
    return history;
  }

  app.controller( 'spellCtrl', function( $scope, $http ) {
    var concept = rndArr(concepts);
    $scope.spellname = getSpellName(concept);
    $scope.ingredients = getIngredients(concept);
    $scope.special = '';
    $scope.history = getHistory($scope.ingredients,concept);
    var steps = getSteps($scope.ingredients);
    steps.push(getInvocation(concept));
    $scope.steps = steps;
    $scope.pagenum = Math.ceil(Math.random() * 997) + 2;
  });

})();

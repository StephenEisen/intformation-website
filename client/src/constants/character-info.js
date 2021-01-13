const Options = [
    {name: 'Achates', value: 'Achates', class: 'Soul Weaver', element:'Fire'}, 
    {name: 'Adlay', value: 'Adlay', class: 'Mage', element:'Earth'},
    {name: 'Adventurer Ras', value: 'Adventurer Ras', class: 'Knight', element:'Fire'},
    {name: 'Ainos', value: 'Ainos', class: 'Soul Weaver', element:'Dark'},
    {name: 'Ains', value: 'Ains', class: 'Warrior', element:'Earth'},
    {name: 'Aither', value: 'Aither', class: 'Soul Weaver', element:'Ice'},
    {name: 'Alencia', value: 'Alencia', class: 'Warrior', element:'Earth'},
    {name: 'Alexa', value: 'Alexa', class: 'Thief', element:'Ice'},
    {name: 'All-Rounder Wanda', value: 'All-Rounder Wanda', class: 'Ranger', element:'Dark'},
    {name: 'Ambitious Tywin', value: 'Ambitious Tywin', class: 'Knight', element:'Light'},
    {name: 'Angelic Montmorancy', value: 'Angelic Montmorancy', class: 'Soul Weaver', element:'Ice'},
    {name: 'Angelica', value: 'Angelica', class: 'Soul Weaver', element:'Ice'},
    {name: 'Apocalypse Ravi', value: 'Apocalypse Ravi', class: 'Warrior', element:'Dark'},
    {name: 'Aramintha', value: 'Aramintha', class: 'Mage', element:'Fire'},
    {name: 'Arbiter Vildred', value: 'Arbiter Vildred', class: 'Thief', element:'Dark'},
    {name: 'Archdemon\'s Shadow', value: 'Archdemon\'s Shadow', class: 'Mage', element:'Dark'},
    {name: 'Armin', value: 'Armin', class: 'Knight', element:'Earth'},
    {name: 'Arowell', value: 'Arowell', class: 'Knight', element:'Light'},
    {name: 'Assassin Cartuja', value: 'Assassin Cartuja', class: 'Warrior', element:'Dark'},
    {name: 'Assassin Cidd', value: 'Assassin Cidd', class: 'Thief', element:'Dark'},
    {name: 'Assassin Coli', value: 'Assassin Coli', class: 'Thief', element:'Dark'},
    {name: 'Auxiliary Lots', value: 'Auxiliary Lots', class: 'Mage', element:'Dark'},
    {name: 'Azalea', value: 'Azalea', class: 'Warrior', element:'Fire'},
    {name: 'Baal and Sezan', value: 'Baal and Sezan', class: 'Mage', element:'Fire'},
    {name: 'Baiken', value: 'Baiken', class: 'Thief', element:'Earth'},
    {name: 'Basar', value: 'Basar', class: 'Mage', element:'Earth'},
    {name: 'Bask', value: 'Bask', class: 'Knight', element:'Ice'},
    {name: 'Batisse', value: 'Batisse', class: 'Warrior', element:'Dark'},
    {name: 'Bellona', value: 'Bellona', class: 'Ranger', element:'Earth'},
    {name: 'Benevolent Romann', value: 'Benevolent Romann', class: 'Mage', element:'Light'},
    {name: 'Blaze Dingo', value: 'Blaze Dingo', class: 'Soul Weaver', element:'Light'},
    {name: 'Blood Blade Karin', value: 'Blood Blade Karin', class: 'Thief', element:'Dark'},
    {name: 'Blood Moon Haste', value: 'Blood Moon Haste', class: 'Soul Weaver', element:'Dark'},
    {name: 'Briar Witch Iseria', value: 'Briar Witch Iseria', class: 'Ranger', element:'Dark'},
    {name: 'Butcher Corps Inquisitor', value: 'Butcher Corps Inquisitor', class: 'Knight', element:'Fire'},
    {name: 'Captain Rikoris', value: 'Captain Rikoris', class: 'Warrior', element:'Light'},
    {name: 'Carmainerose', value: 'Carmainerose', class: 'Mage', element:'Fire'},
    {name: 'Carrot', value: 'Carrot', class: 'Mage', element:'Fire'},
    {name: 'Cartuja', value: 'Cartuja', class: 'Warrior', element:'Earth'},
    {name: 'Cecilia', value: 'Cecilia', class: 'Knight', element:'Fire'},
    {name: 'Celeste', value: 'Celeste', class: 'Ranger', element:'Light'},
    {name: 'Celestial Mercedes', value: 'Celestial Mercedes', class: 'Mage', element:'Dark'},
    {name: 'Celine', value: 'Celine', class: 'Thief', element:'Earth'},
    {name: 'Cerise', value: 'Cerise', class: 'Ranger', element:'Ice'},
    {name: 'Cermia', value: 'Cermia', class: 'Warrior', element:'Fire'},
    {name: 'Challenger Dominiel', value: 'Challenger Dominiel', class: 'Mage', element:'Dark'},
    {name: 'Champion Zerato', value: 'Champion Zerato', class: 'Mage', element:'Dark'},
    {name: 'Chaos Inquisitor', value: 'Chaos Inquisitor', class: 'Knight', element:'Fire'},
    {name: 'Chaos Sect Axe', value: 'Chaos Sect Axe', class: 'Warrior', element:'Dark'},
    {name: 'Charles', value: 'Charles', class: 'Knight', element:'Earth'},
    {name: 'Charlotte', value: 'Charlotte', class: 'Knight', element:'Fire'},
    {name: 'Chloe', value: 'Chloe', class: 'Warrior', element:'Ice'},
    {name: 'Choux', value: 'Choux', class: 'Warrior', element:'Ice'},
    {name: 'Church of Ilryos Axe', value: 'Church of Ilryos Axe', class: 'Warrior', element:'Dark'},
    {name: 'Cidd', value: 'Cidd', class: 'Thief', element:'Earth'},
    {name: 'Clarissa', value: 'Clarissa', class: 'Warrior', element:'Ice'},
    {name: 'Coli', value: 'Coli', class: 'Thief', element:'Ice'},
    {name: 'Commander Lorina', value: 'Commander Lorina', class: 'Warrior', element:'Dark'},
    {name: 'Corvus', value: 'Corvus', class: 'Warrior', element:'Fire'},
    {name: 'Crescent Moon Rin', value: 'Crescent Moon Rin', class: 'Thief', element:'Dark'},
    {name: 'Crimson Armin', value: 'Crimson Armin', class: 'Knight', element:'Light'},
    {name: 'Crozet', value: 'Crozet', class: 'Knight', element:'Ice'},
    {name: 'Dark Corvus', value: 'Dark Corvus', class: 'Warrior', element:'Dark'},
    {name: 'Desert Jewel Basar', value: 'Desert Jewel Basar', class: 'Soul Weaver', element:'Light'},
    {name: 'Destina', value: 'Destina', class: 'Soul Weaver', element:'Earth'},
    {name: 'Diene', value: 'Diene', class: 'Soul Weaver', element:'Ice'},
    {name: 'Dingo', value: 'Dingo', class: 'Warrior', element:'Fire'},
    {name: 'Dizzy', value: 'Dizzy', class: 'Mage', element:'Ice'},
    {name: 'Doll Maker Pearlhorizon', value: 'Doll Maker Pearlhorizon', class: 'Mage', element:'Earth'},
    {name: 'Dominiel', value: 'Dominiel', class: 'Mage', element:'Ice'},
    {name: 'Doris', value: 'Doris', class: 'Soul Weaver', element:'Light'},
    {name: 'Eaton', value: 'Eaton', class: 'Knight', element:'Light'},
    {name: 'Elena', value: 'Elena', class: 'Soul Weaver', element:'Ice'},
    {name: 'Elphelt Valentine', value: 'Elphelt Valentine', class: 'Ranger', element:'Fire'},
    {name: 'Elson', value: 'Elson', class: 'Soul Weaver', element:'Light'},
    {name: 'Enott', value: 'Enott', class: 'Warrior', element:'Ice'},
    {name: 'Ervalen', value: 'Ervalen', class: 'Thief', element:'Earth'},
    {name: 'Fairytale Tenebria', value: 'Fairytale Tenebria', class: 'Mage', element:'Ice'},
    {name: 'Faithless Lidica', value: 'Faithless Lidica', class: 'Ranger', element:'Light'},
    {name: 'Falconer Kluri', value: 'Falconer Kluri', class: 'Knight', element:'Earth'},
    {name: 'Fallen Cecilia', value: 'Fallen Cecilia', class: 'Knight', element:'Dark'},
    {name: 'Fighter Maya', value: 'Fighter Maya', class: 'Knight', element:'Light'},
    {name: 'Flan', value: 'Flan', class: 'Ranger', element:'Ice'},
    {name: 'Free Spirit Tieria', value: 'Free Spirit Tieria', class: 'Warrior', element:'Light'},
    {name: 'Furious', value: 'Furious', class: 'Ranger', element:'Ice'},
    {name: 'General Purrgis', value: 'General Purrgis', class: 'Warrior', element:'Light'},
    {name: 'Glenn', value: 'Glenn', class: 'Ranger', element:'Earth'},
    {name: 'Gloomyrain', value: 'Gloomyrain', class: 'Mage', element:'Light'},
    {name: 'Godmother', value: 'Godmother', class: 'Ranger', element:'Fire'},
    {name: 'Guider Aither', value: 'Guider Aither', class: 'Mage', element:'Light'},
    {name: 'Gunther', value: 'Gunther', class: 'Warrior', element:'Light'},
    {name: 'Haste', value: 'Haste', class: 'Thief', element:'Fire'},
    {name: 'Hataan', value: 'Hataan', class: 'Thief', element:'Fire'},
    {name: 'Hazel', value: 'Hazel', class: 'Soul Weaver', element:'Fire'},
    {name: 'Helga', value: 'Helga', class: 'Warrior', element:'Earth'},
    {name: 'Holiday Yufine', value: 'Holiday Yufine', class: 'Warrior', element:'Fire'},
    {name: 'Hurado', value: 'Hurado', class: 'Mage', element:'Dark'},
    {name: 'Ian', value: 'Ian', class: 'Ranger', element:'Ice'},
    {name: 'Iseria', value: 'Iseria', class: 'Ranger', element:'Earth'},
    {name: 'Jecht', value: 'Jecht', class: 'Soul Weaver', element:'Earth'},
    {name: 'Jena', value: 'Jena', class: 'Mage', element:'Ice'},
    {name: 'Judge Kise', value: 'Judge Kise', class: 'Warrior', element:'Light'},
    {name: 'Judith', value: 'Judith', class: 'Thief', element:'Fire'},
    {name: 'Karin', value: 'Karin', class: 'Thief', element:'Ice'},
    {name: 'Kawerik', value: 'Kawerik', class: 'Mage', element:'Fire'},
    {name: 'Kayron', value: 'Kayron', class: 'Thief', element:'Fire'},
    {name: 'Ken', value: 'Ken', class: 'Warrior', element:'Fire'},
    {name: 'Khawana', value: 'Khawana', class: 'Thief', element:'Fire'},
    {name: 'Khawazu', value: 'Khawazu', class: 'Warrior', element:'Fire'},
    {name: 'Kikirat V2', value: 'Kikirat V2', class: 'Knight', element:'Light'},
    {name: 'Kiris', value: 'Kiris', class: 'Ranger', element:'Earth'},
    {name: 'Kise', value: 'Kise', class: 'Thief', element:'Ice'},
    {name: 'Kitty Clarissa', value: 'Kitty Clarissa', class: 'Warrior', element:'Dark'},
    {name: 'Kizuna AI', value: 'Kizuna AI', class: 'Soul Weaver', element:'Fire'},
    {name: 'Kluri', value: 'Kluri', class: 'Knight', element:'Earth'},
    {name: 'Krau', value: 'Krau', class: 'Knight', element:'Ice'},
    {name: 'Landy', value: 'Landy', class: 'Ranger', element:'Earth'},
    {name: 'Last Rider Krau', value: 'Last Rider Krau', class: 'Knight', element:'Light'},
    {name: 'Lena', value: 'Lena', class: 'Warrior', element:'Ice'},
    {name: 'Leo', value: 'Leo', class: 'Ranger', element:'Earth'},
    {name: 'Lidica', value: 'Lidica', class: 'Ranger', element:'Fire'},
    {name: 'Lilias', value: 'Lilias', class: 'Knight', element:'Fire'},
    {name: 'Lilibet', value: 'Lilibet', class: 'Warrior', element:'Earth'},
    {name: 'Little Queen Charlotte', value: 'Little Queen Charlotte', class: 'Warrior', element:'Light'},
    {name: 'Lorina', value: 'Lorina', class: 'Warrior', element:'Dark'},
    {name: 'Lots', value: 'Lots', class: 'Soul Weaver', element:'Earth'},
    {name: 'Ludwig', value: 'Ludwig', class: 'Mage', element:'Earth'},
    {name: 'Luluca', value: 'Luluca', class: 'Mage', element:'Ice'},
    {name: 'Luna', value: 'Luna', class: 'Warrior', element:'Ice'},
    {name: 'Magic Scholar Doris', value: 'Magic Scholar Doris', class: 'Soul Weaver', element:'Light'},
    {name: 'Maid Chloe', value: 'Maid Chloe', class: 'Soul Weaver', element:'Light'},
    {name: 'Martial Artist Ken', value: 'Martial Artist Ken', class: 'Warrior', element:'Dark'},
    {name: 'Mascot Hazel', value: 'Mascot Hazel', class: 'Soul Weaver', element:'Fire'},
    {name: 'Maya', value: 'Maya', class: 'Knight', element:'Fire'},
    {name: 'Melissa', value: 'Melissa', class: 'Mage', element:'Fire'},
    {name: 'Mercedes', value: 'Mercedes', class: 'Mage', element:'Fire'},
    {name: 'Mercenary Helga', value: 'Mercenary Helga', class: 'Warrior', element:'Earth'},
    {name: 'Mirsa', value: 'Mirsa', class: 'Thief', element:'Light'},
    {name: 'Mistychain', value: 'Mistychain', class: 'Mage', element:'Ice'},
    {name: 'Montmorancy', value: 'Montmorancy', class: 'Soul Weaver', element:'Ice'},
    {name: 'Mort', value: 'Mort', class: 'Knight', element:'Earth'},
    {name: 'Mucacha', value: 'Mucacha', class: 'Warrior', element:'Earth'},
    {name: 'Mui', value: 'Mui', class: 'Warrior', element:'Earth'},
    {name: 'Nemunas', value: 'Nemunas', class: 'Ranger', element:'Fire'},
    {name: 'Operator Sigret', value: 'Operator Sigret', class: 'Ranger', element:'Dark'},
    {name: 'Otillie', value: 'Otillie', class: 'Mage', element:'Dark'},
    {name: 'Pavel', value: 'Pavel', class: 'Ranger', element:'Earth'},
    {name: 'Pearlhorizon', value: 'Pearlhorizon', class: 'Mage', element:'Earth'},
    {name: 'Purrgis', value: 'Purrgis', class: 'Warrior', element:'Earth'},
    {name: 'Pyllis', value: 'Pyllis', class: 'Knight', element:'Dark'},
    {name: 'Ras', value: 'Ras', class: 'Knight', element:'Fire'},
    {name: 'Ravi', value: 'Ravi', class: 'Warrior', element:'Fire'},
    {name: 'Ray', value: 'Ray', class: 'Soul Weaver', element:'Earth'},
    {name: 'Remnant Violet', value: 'Remnant Violet', class: 'Thief', element:'Dark'},
    {name: 'Requiemroar', value: 'Requiemroar', class: 'Soul Weaver', element:'Dark'},
    {name: 'Researcher Carrot', value: 'Researcher Carrot', class: 'Mage', element:'Fire'},
    {name: 'Righteous Thief Roozid', value: 'Righteous Thief Roozid', class: 'Thief', element:'Earth'},
    {name: 'Rikoris', value: 'Rikoris', class: 'Warrior', element:'Light'},
    {name: 'Rima', value: 'Rima', class: 'Ranger', element:'Ice'},
    {name: 'Rin', value: 'Rin', class: 'Soul Weaver', element:'Earth'},
    {name: 'Roaming Warrior Leo', value: 'Roaming Warrior Leo', class: 'Ranger', element:'Dark'},
    {name: 'Roana', value: 'Roana', class: 'Soul Weaver', element:'Earth'},
    {name: 'Romann', value: 'Romann', class: 'Mage', element:'Ice'},
    {name: 'Roozid', value: 'Roozid', class: 'Thief', element:'Earth'},
    {name: 'Rose', value: 'Rose', class: 'Knight', element:'Ice'},
    {name: 'Ruele of Light', value: 'Ruele of Light', class: 'Soul Weaver', element:'Light'},
    {name: 'Sage Baal and Sezan', value: 'Sage Baal and Sezan', class: 'Mage', element:'Light'},
    {name: 'Schuri', value: 'Schuri', class: 'Ranger', element:'Fire'},
    {name: 'Seaside Bellona', value: 'Seaside Bellona', class: 'Ranger', element:'Ice'},
    {name: 'Serila', value: 'Serila', class: 'Mage', element:'Fire'},
    {name: 'Sez', value: 'Sez', class: 'Thief', element:'Ice'},
    {name: 'Shadow Rose', value: 'Shadow Rose', class: 'Knight', element:'Dark'},
    {name: 'Shooting Star Achates', value: 'Shooting Star Achates', class: 'Soul Weaver', element:'Dark'},
    {name: 'Sigret', value: 'Sigret', class: 'Warrior', element:'Ice'},
    {name: 'Silk', value: 'Silk', class: 'Ranger', element:'Earth'},
    {name: 'Silver Blade Aramintha', value: 'Silver Blade Aramintha', class: 'Mage', element:'Light'},
    {name: 'Sinful Angelica', value: 'Sinful Angelica', class: 'Soul Weaver', element:'Dark'},
    {name: 'Sol Badguy', value: 'Sol Badguy', class: 'Warrior', element:'Fire'},
    {name: 'Sonia', value: 'Sonia', class: 'Soul Weaver', element:'Light'},
    {name: 'Specimen Sez', value: 'Specimen Sez', class: 'Thief', element:'Light'},
    {name: 'Specter Tenebria', value: 'Specter Tenebria', class: 'Mage', element:'Dark'},
    {name: 'Surin', value: 'Surin', class: 'Thief', element:'Fire'},
    {name: 'Sven', value: 'Sven', class: 'Thief', element:'Dark'},
    {name: 'Tamarinne', value: 'Tamarinne', class: 'Soul Weaver', element:'Fire'},
    {name: 'Taranor Guard', value: 'Taranor Guard', class: 'Warrior', element:'Ice'},
    {name: 'Taranor Royal Guard', value: 'Taranor Royal Guard', class: 'Knight', element:'Ice'},
    {name: 'Tempest Surin', value: 'Tempest Surin', class: 'Thief', element:'Light'},
    {name: 'Tenebria', value: 'Tenebria', class: 'Mage', element:'Fire'},
    {name: 'Tieria', value: 'Tieria', class: 'Warrior', element:'Fire'},
    {name: 'Top Model Luluca', value: 'Top Model Luluca', class: 'Mage', element:'Dark'},
    {name: 'Troublemaker Crozet', value: 'Troublemaker Crozet', class: 'Knight', element:'Dark'},
    {name: 'Tywin', value: 'Tywin', class: 'Knight', element:'Ice'},
    {name: 'Vildred', value: 'Vildred', class: 'Thief', element:'Earth'},
    {name: 'Violet', value: 'Violet', class: 'Thief', element:'Earth'},
    {name: 'Vivian', value: 'Vivian', class: 'Mage', element:'Earth'},
    {name: 'Wanda', value: 'Wanda', class: 'Ranger', element:'Dark'},
    {name: 'Wanderer Silk', value: 'Wanderer Silk', class: 'Ranger', element:'Light'},
    {name: 'Watcher Schuri', value: 'Watcher Schuri', class: 'Ranger', element:'Light'},
    {name: 'Yufine', value: 'Yufine', class: 'Warrior', element:'Earth'},
    {name: 'Yuna', value: 'Yuna', class: 'Ranger', element:'Ice'},
    {name: 'Zealot Carmainerose', value: 'Zealot Carmainerose', class: 'Mage', element:'Fire'},
    {name: 'Zeno', value: 'Zeno', class: 'Mage', element:'Ice'},
    {name: 'Zerato', value: 'Zerato', class: 'Mage', element:'Ice'},
];

export default Options;
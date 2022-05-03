import ScratchBlocks from 'idm-scratch-blocks-searchbar';

// USE CTRL+D TO QUICKLY ADD SYNONYMS

/**
 * 
 * @param {?String} targetId  - The current editing target
 * @returns 
 */
const blocks = (targetId, costumeName = '', backdropName = '', soundName = '') => {

    const stageSelected = ScratchBlocks.ScratchMsgs.translate(
        'MOTION_STAGE_SELECTED',
        'Stage selected: no motion blocks'
    );

    const hello = ScratchBlocks.ScratchMsgs.translate('LOOKS_HELLO', 'Hello!');
    const hmm = ScratchBlocks.ScratchMsgs.translate('LOOKS_HMM', 'Hmm...');

    const name = ScratchBlocks.ScratchMsgs.translate('SENSING_ASK_TEXT', 'What\'s your name?');

    const apple = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_APPLE', 'apple');
    const banana = ScratchBlocks.ScratchMsgs.translate('OPERATORS_JOIN_BANANA', 'banana');
    const letter = ScratchBlocks.ScratchMsgs.translate('OPERATORS_LETTEROF_APPLE', 'a');

    return [
        {
            prompt: 'move steps',
            tags: ['all', 'motion'],
            xml: `
            <block type="motion_movesteps">
                <value name="STEPS">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'turn right',
            tags: ['all', 'motion', 'rotation'],
            xml: `
            <block type="motion_turnright">
                <value name="DEGREES">
                    <shadow type="math_number">
                        <field name="NUM">15</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'turn left',
            tags: ['all', 'motion', 'rotation'],
            xml: `
            <block type="motion_turnleft">
                <value name="DEGREES">
                    <shadow type="math_number">
                        <field name="NUM">15</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'go to',
            tags: ['all', 'motion'],
            xml: `
            <block type="motion_goto">
                <value name="TO">
                    <shadow type="motion_goto_menu">
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'go to x: y:',
            tags: ['all', 'motion', 'coordinates'],
            xml: `
            <block type="motion_gotoxy">
                <value name="X">
                    <shadow id="movex" type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="Y">
                    <shadow id="movey" type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'glide secs to',
            tags: ['all', 'motion', 'seconds'],
            xml: `
            <block type="motion_glideto" id="motion_glideto">
                <value name="SECS">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="TO">
                    <shadow type="motion_glideto_menu">
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'glide secs to x: y:',
            tags: ['all', 'motion', 'seconds', 'coordinates'],
            xml: `
            <block type="motion_glidesecstoxy">
                <value name="SECS">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="X">
                    <shadow id="glidex" type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="Y">
                    <shadow id="glidey" type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'point in direction',
            tags: ['all', 'motion', 'rotation'],
            xml: `
            <block type="motion_pointindirection">
                <value name="DIRECTION">
                    <shadow type="math_angle">
                        <field name="NUM">90</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'point towards',
            tags: ['all', 'motion', 'rotation'],
            xml: `
            <block type="motion_pointtowards">
                <value name="TOWARDS">
                    <shadow type="motion_pointtowards_menu">
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'change x by',
            tags: ['all', 'motion', 'coordinates'],
            xml: `
            <block type="motion_changexby">
                <value name="DX">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'set x to',
            tags: ['all', 'motion', 'coordinates'],
            xml: `
            <block type="motion_setx">
                <value name="X">
                    <shadow id="setx" type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'change y by',
            tags: ['all', 'motion', 'coordinates'],
            xml: `
            <block type="motion_changeyby">
                <value name="DY">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'set y to',
            tags: ['all', 'motion', 'coordinates'],
            xml: `
            <block type="motion_sety">
                <value name="Y">
                    <shadow id="sety" type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'if on edge bounce',
            tags: ['all', 'motion', 'condition'],
            xml: `
            <block type="motion_ifonedgebounce"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'set rotation style',
            tags: ['all', 'motion', 'rotation'],
            xml: `
            <block type="motion_setrotationstyle"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'x position',
            tags: ['all', 'variable', 'motion', 'coordinates'],
            xml: `
            <block id="${targetId}_xposition" type="motion_xposition"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'y position',
            tags: ['all', 'variable', 'motion', 'coordinates'],
            xml: `
            <block id="${targetId}_yposition" type="motion_yposition"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'direction',
            tags: ['all', 'variable', 'motion', 'rotation'],
            xml: `
            <block id="${targetId}_direction" type="motion_direction"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'say for seconds',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_sayforsecs">
                <value name="MESSAGE">
                    <shadow type="text">
                        <field name="TEXT">${hello}</field>
                    </shadow>
                </value>
                <value name="SECS">
                    <shadow type="math_number">
                        <field name="NUM">2</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'say',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_say">
                <value name="MESSAGE">
                    <shadow type="text">
                        <field name="TEXT">${hello}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'think for seconds',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_thinkforsecs">
                <value name="MESSAGE">
                    <shadow type="text">
                        <field name="TEXT">${hmm}</field>
                    </shadow>
                </value>
                <value name="SECS">
                    <shadow type="math_number">
                        <field name="NUM">2</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'think',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_think">
                <value name="MESSAGE">
                    <shadow type="text">
                        <field name="TEXT">${hmm}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'switch backdrop to',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        }, {
            prompt: 'swith backdrop to and wait',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_switchbackdroptoandwait">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'next backdrop',
            tags: ['all', 'looks'],
            xml: `
                <block type="looks_nextbackdrop"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'switch costume to',
            tags: ['all', 'looks'],
            xml: `
            <block id="${targetId}_switchcostumeto" type="looks_switchcostumeto">
                <value name="COSTUME">
                    <shadow type="looks_costume">
                        <field name="COSTUME">${costumeName}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'next costume',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_nextcostume"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'switch backdrop to',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">${backdropName}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'next backdrop',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_nextbackdrop"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'change size by',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_changesizeby">
                <value name="CHANGE">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'set size to',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_setsizeto">
                <value name="SIZE">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'change effect by',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_changeeffectby">
                <value name="CHANGE">
                    <shadow type="math_number">
                        <field name="NUM">25</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'set effect to',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_seteffectto">
                <value name="VALUE">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'clear graphic effects',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_cleargraphiceffects"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'show',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_show"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'hide',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_hide"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'go to layer',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_gotofrontback"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'go layers',
            tags: ['all', 'looks'],
            xml: `
            <block type="looks_goforwardbackwardlayers">
                <value name="NUM">
                    <shadow type="math_integer">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'backdrop',
            tags: ['all', 'looks', 'variable'],
            xml: `
            <block id="backdropnumbername" type="looks_backdropnumbername"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'costume',
            tags: ['all', 'looks', 'variable'],
            xml: `
            <block id="${targetId}_costumenumbername" type="looks_costumenumbername"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'size',
            tags: ['all', 'looks', 'variable'],
            xml: `
            <block id="${targetId}_size" type="looks_size"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'play sound until done',
            tags: ['all', 'sound'],
            xml: `
            <block id="${targetId}_sound_playuntildone" type="sound_playuntildone">
                <value name="SOUND_MENU">
                    <shadow type="sound_sounds_menu">
                        <field name="SOUND_MENU">${soundName}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'start sound',
            tags: ['all', 'sound'],
            xml: `
            <block id="${targetId}_sound_play" type="sound_play">
                <value name="SOUND_MENU">
                    <shadow type="sound_sounds_menu">
                        <field name="SOUND_MENU">${soundName}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'stop all sounds',
            tags: ['all', 'sound'],
            xml: `
            <block type="sound_stopallsounds"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'change effect by',
            tags: ['all', 'sound'],
            xml: `
            <block type="sound_changeeffectby">
                <value name="VALUE">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'set effect to',
            tags: ['all', 'sound'],
            xml: `
            <block type="sound_seteffectto">
                <value name="VALUE">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'clear sound effects',
            tags: ['all', 'sound'],
            xml: `
            <block type="sound_cleareffects"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'change volume by',
            tags: ['all', 'sound'],
            xml: `
            <block type="sound_changevolumeby">
                <value name="VOLUME">
                    <shadow type="math_number">
                        <field name="NUM">-10</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'set volume to',
            tags: ['all', 'sound'],
            xml: `
            <block type="sound_setvolumeto">
                <value name="VOLUME">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'volume',
            tags: ['all', 'sound', 'variable'],
            xml: `
            <block id="${targetId}_volume" type="sound_volume"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'when flag clicked',
            tags: ['all', 'event', 'start', 'condition'],
            xml: `
            <block type="event_whenflagclicked"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'when key pressed',
            tags: ['all', 'event', 'start', 'condition'],
            xml: `
            <block type="event_whenkeypressed">
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'when stage clicked',
            tags: ['all', 'event', 'start', 'condition'],
            xml: `
            <block type="event_whenstageclicked"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'when this sprite clicked',
            tags: ['all', 'event', 'start', 'condition'],
            xml: `
            <block type="event_whenthisspriteclicked"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'when backdrop switches to',
            tags: ['all', 'event', 'start', 'condition'],
            xml: `
            <block type="event_whenbackdropswitchesto">
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'when greater than',
            tags: ['all', 'event', 'start', 'condition'],
            xml: `
            <block type="event_whengreaterthan">
                <value name="VALUE">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'when I receive',
            tags: ['all', 'event', 'start', 'condition'],
            xml: `
            <block type="event_whenbroadcastreceived">
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'broadcast',
            tags: ['all', 'event'],
            xml: `
            <block type="event_broadcast">
                <value name="BROADCAST_INPUT">
                    <shadow type="event_broadcast_menu"></shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'broadcast and wait',
            tags: ['all', 'event', 'start'],
            xml: `
            <block type="event_broadcastandwait">
                <value name="BROADCAST_INPUT">
                  <shadow type="event_broadcast_menu"></shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'wait seconds',
            tags: ['all', 'control'],
            xml: `
            <block type="control_wait">
                <value name="DURATION">
                    <shadow type="math_positive_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'repeat',
            tags: ['all', 'control', 'loop'],
            xml: `
            <block type="control_repeat">
                <value name="TIMES">
                    <shadow type="math_whole_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'forever',
            tags: ['all', 'control', 'loop'],
            xml: `
            <block id="forever" type="control_forever"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'if then',
            tags: ['all', 'control', 'condition'],
            xml: `
            <block type="control_if"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'if then else',
            tags: ['all', 'control', 'condition'],
            xml: `
            <block type="control_if_else"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'wait until',
            tags: ['all', 'control'],
            xml: `
            <block id="wait_until" type="control_wait_until"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'repeat until',
            tags: ['all', 'control', 'loop'],
            xml: `
            <block id="repeat_until" type="control_repeat_until"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'stop',
            tags: ['all', 'control'],
            xml: `
            <block type="control_stop"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'when I start as clone',
            tags: ['all', 'control', 'start', 'condition'],
            xml: `
            <block type="control_start_as_clone"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'create clone of',
            tags: ['all', 'control'],
            xml: `
            <block type="control_create_clone_of">
                <value name="CLONE_OPTION">
                    <shadow type="control_create_clone_of_menu"/>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'delete clone',
            tags: ['all', 'control'],
            xml: `
            <block type="control_delete_this_clone"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'touching object',
            tags: ['all', 'sensing', 'condition', 'boolean'],
            xml: `
            <block type="sensing_touchingobject">
                <value name="TOUCHINGOBJECTMENU">
                    <shadow type="sensing_touchingobjectmenu"/>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'touching color',
            tags: ['all', 'sensing', 'condition', 'boolean'],
            xml: `
            <block type="sensing_touchingcolor">
                <value name="COLOR">
                    <shadow type="colour_picker"/>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'color is touching color',
            tags: ['all', 'sensing', 'condition', 'boolean'],
            xml: `
            <block type="sensing_coloristouchingcolor">
                <value name="COLOR">
                    <shadow type="colour_picker"/>
                </value>
                <value name="COLOR2">
                    <shadow type="colour_picker"/>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'distance to',
            tags: ['all', 'sensing', 'variable'],
            xml: `
            <block type="sensing_distanceto">
                <value name="DISTANCETOMENU">
                    <shadow type="sensing_distancetomenu"/>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'ask and wait',
            tags: ['all', 'sensing'],
            xml: `
            <block id="askandwait" type="sensing_askandwait">
                <value name="QUESTION">
                    <shadow type="text">
                        <field name="TEXT">${name}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'answer',
            tags: ['all', 'sensing', 'variable'],
            xml: `
            <block id="answer" type="sensing_answer"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'key pressed',
            tags: ['all', 'sensing', 'condition', 'boolean'],
            xml: `
            <block type="sensing_keypressed">
                <value name="KEY_OPTION">
                    <shadow type="sensing_keyoptions"/>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'mouse down',
            tags: ['all', 'sensing', 'condition', 'boolean'],
            xml: `
            <block type="sensing_mousedown"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'mouse x',
            tags: ['all', 'sensing', 'variable'],
            xml: `
            <block type="sensing_mousex"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'mouse y',
            tags: ['all', 'sensing', 'variable'],
            xml: `
            <block type="sensing_mousey"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'set drag mode',
            tags: ['all', 'sensing'],
            xml: `
            <block type="sensing_setdragmode" id="sensing_setdragmode"></block>
            `,
            relevance: 0,
        },
        {
            prompt: 'loudness',
            tags: ['all', 'sensing', 'variable'],
            xml: `
            <block id="loudness" type="sensing_loudness"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'timer',
            tags: ['all', 'sensing', 'variable'],
            xml: `
            <block id="timer" type="sensing_timer"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'reset timer',
            tags: ['all', 'sensing'],
            xml: `
            <block type="sensing_resettimer"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'object of stage',
            tags: ['all', 'sensing', 'variable'],
            xml: `
            <block id="of" type="sensing_of">
                <value name="OBJECT">
                    <shadow id="sensing_of_object_menu" type="sensing_of_object_menu"/>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'current',
            tags: ['all', 'sensing', 'variable'],
            xml: `
            <block id="current" type="sensing_current"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'days since 2000',
            tags: ['all', 'sensing', 'variable'],
            xml: `
            <block type="sensing_dayssince2000"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'username',
            tags: ['all', 'sensing', 'variable'],
            xml: `
            <block type="sensing_username"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'add',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_add">
                <value name="NUM1">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
                <value name="NUM2">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'subtract',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_subtract">
                <value name="NUM1">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
                <value name="NUM2">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'multiply',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_multiply">
                <value name="NUM1">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
                <value name="NUM2">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'divide',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_divide">
                <value name="NUM1">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
                <value name="NUM2">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'pick random to',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_random">
                <value name="FROM">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="TO">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'greater than',
            tags: ['all', 'operator', 'condition'],
            xml: `
            <block type="operator_gt">
                <value name="OPERAND1">
                    <shadow type="text">
                        <field name="TEXT"/>
                    </shadow>
                </value>
                <value name="OPERAND2">
                    <shadow type="text">
                        <field name="TEXT">50</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'less than',
            tags: ['all', 'operator', 'condition', 'boolean'],
            xml: `
            <block type="operator_lt">
                <value name="OPERAND1">
                    <shadow type="text">
                        <field name="TEXT"/>
                    </shadow>
                </value>
                <value name="OPERAND2">
                    <shadow type="text">
                        <field name="TEXT">50</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'equals',
            tags: ['all', 'operator', 'condition', 'boolean'],
            xml: `
            <block type="operator_equals">
                <value name="OPERAND1">
                    <shadow type="text">
                        <field name="TEXT"/>
                    </shadow>
                </value>
                <value name="OPERAND2">
                    <shadow type="text">
                        <field name="TEXT">50</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'and',
            tags: ['all', 'operator', 'condition', 'boolean'],
            xml: `
            <block type="operator_and"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'or',
            tags: ['all', 'operator', 'condition', 'boolean'],
            xml: `
            <block type="operator_or"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'not',
            tags: ['all', 'operator', 'condition', 'boolean'],
            xml: `
            <block type="operator_not"/>
            `,
            relevance: 0,
        },
        {
            prompt: 'join',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_join">
                <value name="STRING1">
                    <shadow type="text">
                        <field name="TEXT">${apple} </field>
                    </shadow>
                </value>
                <value name="STRING2">
                    <shadow type="text">
                        <field name="TEXT">${banana}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'letter of',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_letter_of">
                <value name="LETTER">
                    <shadow type="math_whole_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="STRING">
                    <shadow type="text">
                        <field name="TEXT">${apple}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'length of',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_length">
                <value name="STRING">
                    <shadow type="text">
                        <field name="TEXT">${apple}</field>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'contains',
            tags: ['all', 'operator', 'condition'],
            xml: `
            <block type="operator_contains" id="operator_contains">
              <value name="STRING1">
                <shadow type="text">
                  <field name="TEXT">${apple}</field>
                </shadow>
              </value>
              <value name="STRING2">
                <shadow type="text">
                  <field name="TEXT">${letter}</field>
                </shadow>
              </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'mod',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_mod">
                <value name="NUM1">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
                <value name="NUM2">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'round',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_round">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
        {
            prompt: 'math operation',
            tags: ['all', 'operator', 'variable'],
            xml: `
            <block type="operator_mathop">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM"/>
                    </shadow>
                </value>
            </block>
            `,
            relevance: 0,
        },
    ]
}

export default blocks;

/*
        */
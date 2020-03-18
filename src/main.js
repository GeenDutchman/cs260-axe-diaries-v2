import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

var data = {
  parties: [
    {
      party_id: 0,
      party_name: "Irregular Hyenas",
      party_image: undefined,
      party_description: "Flee through the jungle",
      party_members: [
        {
          adventurer_id: 0,
          adventurer_name: "Artimis",
          adventurer_class: "Wizard",
          adventurer_script: "wizard-script",
          adventurer_intro: "I am Artimis, and I am a daughter of Thom Bosman and Hilyard " +
            "Mainsman. They are rather successful merchants from the Krik river. " +
            "Because of their patronage, I was able to attend the Wizarding " +
            "school at the Hart Meer. There I found myself to have some aptitude " +
            "with the psionic school of spells. Actually...great aptitude. But I " +
            "was only able to study for so long before disaster struck my " +
            "Father's business. They can no longer support my education at the " +
            "university, and now I must travel back home through the Jungle van " +
            "Riem. I was at least able to find an escort. I hope that my family " +
            "is safe."
        },
        {
          adventurer_id: 1,
          adventurer_name: "Handre of Hegwaard",
          adventurer_class: "Druid",
          adventurer_script: "druid-script",
          adventurer_intro: "Sometimes I must doubt the things I've heard. I'm really not from " +
            "this continent. I was learning from the Gnomes on J'Dert when they " +
            "suddenly prophesied that I needed to go to Nederska and restore " +
            "balance to the...I don't know what they called it. I don't really " +
            "speak Gnommish, and they kept babbling at me. I agreed to whatever " +
            "it was, and they made me drink something. I think it was drugged, " +
            "and I woke up on a boat. Well, now I'm here, shipped all the way to " +
            "the Hart Meer, and they dropped me off with some Gnommish " +
            "farewell...Shantel help me."
        },
        {
          adventurer_id: 2,
          adventurer_name: "Emmfa",
          adventurer_class: "Fighter",
          adventurer_script: "fighter-script",
          adventurer_intro: "Hi! Yes I'm a halfling, but at least I'm taller than my Mom! I have " +
            "way to much of a story to tell here, but, to summarize: I have waay " +
            "too many sisters, and we don't really get along. I am number 7 of " +
            "twelve girls. Right about when Dad started despairing about my dowry " +
            "('cuz all my sisters older than me were all starting to make babies " +
            "with their arranged hubbies) I decided that I was " +
            "*not* wanting kids right then, and signed up for the army. I " +
            "did some time up north fighting the orks. Those dwarves didn't care " +
            "how short I was, just that I was good at fighting and drinking. " +
            "Which I learned. But one of my teammates started making eyes at me, " +
            "so I (officially) left the army and ran to Hart Meer."
        },
        {
          adventurer_id: 3,
          adventurer_name: "Mon-da-hir",
          adventurer_class: "Barbarian",
          adventurer_script: "barbarian-script",
          adventurer_intro: "I'm Mon-da-hir. I am elf, raisd by wolven. They teach me how to hunt, " +
            "smel, and eat. One day I find big stick holding wolvbrother down. I " +
            "pick up and kep. I use to smash smal goblin when they attacking us. We " +
            "win. Goblin-folk get mad and find me. They chase me long way to big " +
            "people city. I meet old elf Chohand'ler in big people city and he help " +
            "me. I smart, and learn how read and rite. But then goblins find us. " +
            "Too many. Old man Chohand'ler died. I kill some goblin-folk and run. " +
            "Too many. I leave to bigger city. Lots of carts and people. I hear " +
            "girl ask for guards help her get home, they say no. I clever, I think " +
            "\"Goblins think track me go north...I must go south.\" Girl home (her " +
            "name Artmis) south, and I know way through the Riem. I help her find " +
            "parents."
        }
      ],
      party_page: undefined
    }
  ]
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')

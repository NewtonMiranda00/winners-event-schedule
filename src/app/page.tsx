'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogoWinners } from '@/assets'

const events = [
  { 
    day: 8, 
    time: '17:00', 
    title: 'Abertura no Airbnb',
    description: 'Credenciamento, networking e jantar em grupo. Uma oportunidade para conhecer os outros participantes e se preparar para os dias intensos que virão.'
  },
  { 
    day: 9, 
    time: '09:00', 
    title: 'Gravações + Palestra JV nave',
    description: 'Sessão de gravações seguida por uma palestra inspiradora na JV nave. Prepare-se para insights valiosos e conteúdo de alto nível.'
  },
  { 
    day: 9, 
    time: '12:00', 
    title: 'Almoço fora do Airbnb + Networking',
    description: 'Momento para relaxar, desfrutar de uma refeição e continuar as conversas iniciadas pela manhã.'
  },
  { 
    day: 10, 
    time: '10:00', 
    title: 'Embarque no Iate para passeio',
    description: 'Prepare-se para uma experiência única! Embarcaremos em um luxuoso iate para um dia de networking, aprendizado e diversão no mar.'
  },
  { 
    day: 10, 
    time: '16:00', 
    title: 'Desembarque do Iate',
    description: 'Retorno à terra firme após um dia incrível no mar. Momento para refletir sobre as experiências e conexões feitas durante o passeio.'
  },
  { 
    day: 10, 
    time: '20:00', 
    title: 'Encontro no Airbnb + Jantar',
    description: 'Reunião informal no Airbnb seguida de um jantar em grupo. Uma chance de compartilhar as experiências do dia e fortalecer os laços criados.'
  },
  { 
    day: 11, 
    time: '09:00', 
    title: 'Gravações + Palestra JV nave',
    description: 'Mais uma sessão de conteúdo valioso, com gravações e uma palestra imperdível na JV nave.'
  },
  { 
    day: 11, 
    time: '12:00', 
    title: 'Almoço fora do Airbnb + Networking',
    description: 'Outra oportunidade para networking e troca de ideias em um ambiente descontraído.'
  },
  { 
    day: 11, 
    time: '20:00', 
    title: 'Jantar no rooftop TETO bar',
    description: 'Um jantar especial com vista panorâmica no TETO bar. O cenário perfeito para celebrar as conexões feitas e o conhecimento adquirido.'
  },
  { 
    day: 12, 
    time: '12:00', 
    title: 'Saída do Airbnb',
    description: 'Encerramento oficial do evento. Momento de despedidas, troca de contatos e últimas reflexões sobre a experiência vivida.'
  },
]

const days = [8, 9, 10, 11, 12]
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui']

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({})

  const toggleDay = (day: number) => {
    setSelectedDay(selectedDay === day ? null : day)
  }

  const toggleEventDescription = (dayTime: string) => {
    setExpandedEvents(prev => ({
      ...prev,
      [dayTime]: !prev[dayTime]
    }))
  }

  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.day]) {
      acc[event.day] = []
    }
    acc[event.day].push(event)
    return acc
  }, {} as Record<number, typeof events>)

  const filteredEvents = selectedDay
    ? { [selectedDay]: groupedEvents[selectedDay] || [] }
    : groupedEvents

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <Image 
          src={LogoWinners}
          alt="Winners Logo" 
          className="mx-auto mb-4"
          width={200} 
          height={80} 
        />

        <div className="bg-black text-white border border-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Programação do Evento</h1>
          <h2 className="text-xl font-semibold mb-4 text-center">Dezembro 2024</h2>

          <div className="flex max-sm:flex-col-reverse justify-center items-center gap-2 mb-6">
            <button
              onClick={() => setSelectedDay(null)}
              className={`px-4 py-2 rounded-full ${
                selectedDay === null
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-white'
              }`}
            >
              Todos
            </button>
            <div className="flex justify-center space-x-2">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-full ${
                    selectedDay === day
                      ? 'bg-white text-black'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            
          </div>

          <div className="space-y-8">
            {Object.entries(filteredEvents).map(([day, dayEvents]) => (
              <div key={day} className="border-t border-gray-800 pt-4">
                <h3 className="text-lg font-semibold mb-2">
                  Dia {day} - {weekDays[days.indexOf(Number(day))]}
                </h3>
                {dayEvents.map((event, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-400 w-16">{event.time}</span>
                      <span className="flex-1 font-semibold">{event.title}</span>
                      <button 
                        onClick={() => toggleEventDescription(`${day}-${event.time}`)}
                        className="ml-2 text-gray-400 hover:text-white"
                        aria-expanded={expandedEvents[`${day}-${event.time}`]}
                        aria-controls={`description-${day}-${event.time}`}
                      >
                        {expandedEvents[`${day}-${event.time}`] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {expandedEvents[`${day}-${event.time}`] && (
                        <motion.div
                          key={`description-${day}-${event.time}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 ml-16 text-sm text-gray-300">
                            {event.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            ))}
            {Object.keys(filteredEvents).length === 0 && (
              <p className="text-gray-500 italic text-center">Nenhuma atividade programada para este dia</p>
            )}
          </div>
        </div>
      </div>

      <footer className="w-full bg-black text-white border-t border-gray-800 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Winners. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
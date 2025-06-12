import { Cpu, Database, MessageSquareDot } from "lucide-react";

interface Statistic {
    title: string;
    value: number;
    icon: React.ReactNode;
}

export default function StatisticCard() {
    const connectedDevices = 3;
    const totalReadings = 15000;
    const activeAlerts = 2;

    const statistics = [
        {
            title: "Connected Devices",
            value: connectedDevices,
            icon: <Cpu className="w-6 h-6 text-green-500" />,
        },
        {
            title: "Total Readings",
            value: totalReadings,
            icon: <Database className="w-6 h-6 text-purple-500" />,
        },
        {
            title: "Active Alerts",
            value: activeAlerts,
            icon: <MessageSquareDot className="w-6 h-6 text-red-500" />,
        },
    ]

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statistics.map((stat, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-lg transition-colors"
                    >
                        <div className="flex items-center mb-2">
                            {stat.icon}
                            <h3 className="ml-2 text-lg font-semibold">
                                {stat.title}
                            </h3>
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
        
    )
}
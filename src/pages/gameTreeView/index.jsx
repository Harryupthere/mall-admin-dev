import React, { useEffect, useState } from 'react'
import DashboardHeader from '../dasboardheader'
import './gameTreeView.scss'
import useApiRequest from "../../hooks/useApiRequest";
import { API_ENDPOINTS } from "../../constants/endPoints";
import { useNavigate } from 'react-router-dom';
import Tree from 'react-d3-tree';

const GameTreeView = () => {
    const { fetchData } = useApiRequest()
    const navigate = useNavigate()
    const [treeData, setTreeData] = useState([]);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    useEffect(() => {
        callApi()
    }, [])
    const callApi = async () => {
        try {
            const treeViewRes = await fetchData(API_ENDPOINTS.gameTreeView, navigate, "GET", {});
            console.log(treeViewRes)
            if (treeViewRes?.success) {
                let data = treeViewRes?.data
                // If multiple root nodes, wrap them under a virtual root
                const formatted =
                    data.length > 1
                        ? {
                            name: 'Virtual Root',
                            children: data.map(transformTreeData),
                        }
                        : transformTreeData(data[0]);

                setTreeData([formatted]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const transformTreeData = (node) => {
        const transformed = {
            name: `${node.id}`,
        };

        if (node.is_admin == 0) {
            transformed.attributes = {
                "User Id": node.user_id,
            };
        } else {
            transformed.attributes = {
                "Admin": true,
            };
        }
        if (node.children && node.children.length > 0) {
            transformed.children = node.children.map(transformTreeData);
        }

        return transformed;
    };


    const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
        const isAdmin = nodeDatum.attributes?.Admin;

        return (
            <g onClick={toggleNode} style={{ cursor: "pointer" }}>
                <circle r={20} fill={isAdmin ? 'red' : '#00AEEF'} stroke="black" strokeWidth={1} />

                {/* Main node name */}
                <text fill="black" x={-45} y={5} fontSize={10}>
                    {nodeDatum.name}
                </text>

                {/* Attributes below the name */}
                {nodeDatum.attributes &&
                    Object.entries(nodeDatum.attributes).map(([key, value], index) => (
                        <text
                            key={key}
                            fill="black"
                            x={-60}
                            y={20 + index * 12} // Positioning each line below
                            fontSize={8}
                        >
                            {`${key}: ${value}`}
                        </text>
                    ))
                }
            </g>
        );
    };

    const containerRef = React.useRef();

    useEffect(() => {
        if (containerRef.current) {
            const dimensions = containerRef.current.getBoundingClientRect();
            setTranslate({
                x: dimensions.width / 2,
                y: 50,
            });
        }
    }, [treeData]);
    return (
        <div className='update-wraped'>
            <DashboardHeader heading="Game Tree View" />
            <div className='main'>
                <div ref={containerRef} style={{ width: '100%', height: '100vh' }}>
                    {treeData.length > 0 && (
                        <Tree
                            data={treeData}
                            translate={translate}
                            nodeSize={{ x: 250, y: 100 }}
                            separation={{ siblings: 1.5, nonSiblings: 2 }}
                            transitionDuration={100000}
                            pathFunc="step"
                            orientation="vertical"
                            // rootNodeClassName="node__root"
                            // branchNodeClassName="node__branch"
                            //leafNodeClassName="node__leaf"
                            renderCustomNodeElement={renderCustomNodeElement}

                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default GameTreeView
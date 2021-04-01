import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const data = {
  id: 'root',
  name: 'Root',
  children: [
    {
      id: '1',
      name: 'Gaji',
      children: [
        {
          id: '2',
          name: 'Gaji Karyawan',
        },
        {
          id: '5',
          name: 'Gaji Driver',
        },
      ],
    },
    {
      id: '3',
      name: 'Transportasi',
      children: [
        {
          id: '4',
          name: 'Bensin',
        },
        {
          id: '4',
          name: 'Reparasi',
        },
      ],
    },
  ],
};

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function DataView() {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
}
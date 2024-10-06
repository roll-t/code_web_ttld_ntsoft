using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace TTLD2024.Class
{
    public class NestedData
    {
        public List<Tree> CreateTree_NguonVon()
        {
            
            SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(""))
                };
            DataTable tabData = ((DataSet)SqlHelper.ExecuteNonQuery_v1(
                    NTSSession.GetConnectionString2()
                    , "Proc_GetTree_NguonVon"
                    , para).Result).Tables[0];
            List<Tree> tree = new List<Tree>();
            if (tabData.Rows.Count > 0)
            {
                for (int i = 0; i < tabData.Rows.Count; i++)
                {
                    var nodes = new List<TreeNode>();
                    TreeNode hoSoGoc = new TreeNode
                    {
                        id = tabData.Rows[i]["NguonVonID"].ToString(),
                        code = tabData.Rows[i]["MaNguonVon"].ToString(),
                        text = tabData.Rows[i]["TenNguonVon"].ToString(),
                        parent = null
                    };
                    nodes.Add(hoSoGoc);
                    // Nạp các con của hồ sơ gốc
                    SqlParameter[] para2 = {
                         new SqlParameter("@ID", DungChung.NormalizationGuid(tabData.Rows[i]["NguonVonID"].ToString()))
                    };
                    DataTable tblDataCT = ((DataSet)SqlHelper.ExecuteNonQuery_v1(
                        NTSSession.GetConnectionString2()
                        , "Proc_GetTree_NguonVon"
                        , para2).Result).Tables[0];
                    foreach (DataRow item in tblDataCT.Rows)
                    {
                        nodes.Add(new TreeNode
                        {
                            id = item["NguonVonID"].ToString(),
                            code = item["MaNguonVon"].ToString(),
                            text = item["TenNguonVon"].ToString(),
                            parent = (!string.IsNullOrEmpty(item["NguonVonID_Cha"].ToString()) 
                                        && DungChung.NormalizationGuid(item["NguonVonID_Cha"].ToString()) != DungChung.NormalizationGuid("") ? item["NguonVonID_Cha"].ToString() : tabData.Rows[i]["NguonVonID"].ToString())
                        });
                    }
                    tree.Add(TreeBuilder.BuildTree(nodes));
                }
            }
            return tree;
        }
        public List<Tree> CreateTree_GiaiDoanDuAn()
        {

            SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(""))
                };
            DataTable tabData = ((DataSet)SqlHelper.ExecuteNonQuery_v1(
                    NTSSession.GetConnectionString2()
                    , "Proc_GetTree_GiaiDoanDuAn"
                    , para).Result).Tables[0];
            List<Tree> tree = new List<Tree>();
            if (tabData.Rows.Count > 0)
            {
                for (int i = 0; i < tabData.Rows.Count; i++)
                {
                    var nodes = new List<TreeNode>();
                    TreeNode hoSoGoc = new TreeNode
                    {
                        id = tabData.Rows[i]["GiaiDoanDuAnID"].ToString(),
                        code = tabData.Rows[i]["MaGiaiDoanDuAn"].ToString(),
                        text = tabData.Rows[i]["TenGiaiDoanDuAn"].ToString(),
                        parent = null
                    };
                    nodes.Add(hoSoGoc);
                    // Nạp các con của hồ sơ gốc
                    SqlParameter[] para2 = {
                         new SqlParameter("@ID", DungChung.NormalizationGuid(tabData.Rows[i]["GiaiDoanDuAnID"].ToString()))
                    };
                    DataTable tblDataCT = ((DataSet)SqlHelper.ExecuteNonQuery_v1(
                        NTSSession.GetConnectionString2()
                        , "Proc_GetTree_GiaiDoanDuAn"
                        , para2).Result).Tables[0];
                    foreach (DataRow item in tblDataCT.Rows)
                    {
                        nodes.Add(new TreeNode
                        {
                            id = item["GiaiDoanDuAnID"].ToString(),
                            code = item["MaGiaiDoanDuAn"].ToString(),
                            text = item["TenGiaiDoanDuAn"].ToString(),
                            parent = (!string.IsNullOrEmpty(item["GiaiDoanDuAnID_Cha"].ToString())
                                        && DungChung.NormalizationGuid(item["GiaiDoanDuAnID_Cha"].ToString()) != DungChung.NormalizationGuid("") ? item["GiaiDoanDuAnID_Cha"].ToString() : tabData.Rows[i]["GiaiDoanDuAnID"].ToString())
                        });
                    }
                    tree.Add(TreeBuilder.BuildTree(nodes));
                }
            }
            return tree;
        }

        public List<Tree> CreateTree_DonVi()
        {

            SqlParameter[] para = {
                    new SqlParameter("@ID", DungChung.NormalizationGuid(""))
                };
            DataTable tabData = ((DataSet)SqlHelper.ExecuteNonQuery_v1(
                    NTSSession.GetConnectionString2()
                    , "Proc_GetTree_DonVi"
                    , para).Result).Tables[0];
            List<Tree> tree = new List<Tree>();
            if (tabData.Rows.Count > 0)
            {
                for (int i = 0; i < tabData.Rows.Count; i++)
                {
                    var nodes = new List<TreeNode>();
                    TreeNode hoSoGoc = new TreeNode
                    {
                        id = tabData.Rows[i]["DonViID"].ToString(),
                        code = tabData.Rows[i]["DonViCode"].ToString(),
                        text = tabData.Rows[i]["TenDonVi"].ToString(),
                        parent = null
                    };
                    nodes.Add(hoSoGoc);
                    // Nạp các con của hồ sơ gốc
                    SqlParameter[] para2 = {
                         new SqlParameter("@ID", DungChung.NormalizationGuid(tabData.Rows[i]["DonViID"].ToString()))
                    };
                    DataTable tblDataCT = ((DataSet)SqlHelper.ExecuteNonQuery_v1(
                        NTSSession.GetConnectionString2()
                        , "Proc_GetTree_DonVi"
                        , para2).Result).Tables[0];
                    foreach (DataRow item in tblDataCT.Rows)
                    {
                        nodes.Add(new TreeNode
                        {
                            id = item["DonViID"].ToString(),
                            code = item["DonViCode"].ToString(),
                            text = item["TenDonVi"].ToString(),
                            parent = (!string.IsNullOrEmpty(item["DonViID_Cha"].ToString())
                                        && DungChung.NormalizationGuid(item["DonViID_Cha"].ToString()) != DungChung.NormalizationGuid("") ? item["DonViID_Cha"].ToString() : tabData.Rows[i]["DonViID"].ToString())
                        });
                    }
                    tree.Add(TreeBuilder.BuildTree(nodes));
                }
            }
            return tree;
        }
    }

    public class TreeNode
    {
        public string id { get; set; }
        public string code { get; set; }
        public string text { get; set; }
        public string parent { get; set; }
        public string detail { get; set; }
        public string detail2 { get; set; }

    }
    public static class TreeBuilder
    {
        public static Tree BuildTree(IEnumerable<TreeNode> nodes)
        {
            if (nodes == null) return new Tree();
            var nodeList = nodes.ToList();
            var tree = FindTreeRoot(nodeList);
            BuildTree(tree, nodeList);
            return tree;
        }

        private static void BuildTree(Tree tree, IList<TreeNode> descendants)
        {
            var children = descendants.Where(node => node.parent == tree.Id).ToArray();
            foreach (var child in children)
            {
                var branch = Map(child);
                tree.Add(branch);
                descendants.Remove(child);
            }
            if (tree.Children != null)
            {
                foreach (var branch in tree.Children)
                {
                    BuildTree(branch, descendants);
                }
            }

        }

        private static Tree FindTreeRoot(IList<TreeNode> nodes)
        {
            var rootNodes = nodes.Where(node => node.parent == null);
            if (rootNodes.Count() != 1) return new Tree();
            var rootNode = rootNodes.Single();
            nodes.Remove(rootNode);
            return Map(rootNode);
        }

        private static Tree Map(TreeNode node)
        {
            return new Tree
            {
                Id = node.id,
                Code = node.code,
                Text = node.text,
                Detail = node.detail,
                Detail2 = node.detail2,
            };
        }
    }
    public static class TreeExtensions
    {
        public static IEnumerable<Tree> Descendants(this Tree value)
        {
            // a descendant is the node self and any descendant of the children
            if (value == null) yield break;
            yield return value;
            // depth-first pre-order tree walker
            foreach (var child in value.Children)
                foreach (var descendantOfChild in child.Descendants())
                {
                    yield return descendantOfChild;
                }
        }

        public static IEnumerable<Tree> Ancestors(this Tree value)
        {
            // an ancestor is the node self and any ancestor of the parent
            var ancestor = value;
            // post-order tree walker
            while (ancestor != null)
            {
                yield return ancestor;
                ancestor = ancestor.Parent;
            }
        }
    }
    public class Tree
    {
        public string Id { get; set; }
        public string Code { get; set; }
        public string Text { get; set; }
        public string Detail { get; set; }
        public string Detail2 { get; set; }
        protected List<Tree> _children;
        protected Tree _parent;

        public Tree()
        {
            Text = string.Empty;
            Code = string.Empty;
            Detail = string.Empty;
            Detail2 = string.Empty;
        }

        public Tree Parent { get { return _parent; } }
        public Tree Root { get { return _parent == null ? this : _parent.Root; } }
        public int Depth { get { return this.Ancestors().Count() - 1; } }

        public IEnumerable<Tree> Children
        {
            get { return _children == null ? null : _children.ToArray(); }
        }

        public override string ToString()
        {
            return Text;
        }

        public void Add(Tree child)
        {
            if (child == null)
                throw new ArgumentNullException();
            if (child._parent != null)
                throw new InvalidOperationException("A tree node must be removed from its parent before adding as child.");
            if (this.Ancestors().Contains(child))
                throw new InvalidOperationException("A tree cannot be a cyclic graph.");
            if (_children == null)
            {
                _children = new List<Tree>();
            }
            Debug.Assert(!_children.Contains(child), "At this point, the node is definately not a child");
            child._parent = this;
            _children.Add(child);
        }

        public bool Remove(Tree child)
        {
            if (child == null)
                throw new ArgumentNullException();
            if (child._parent != this)
                return false;
            Debug.Assert(_children.Contains(child), "At this point, the node is definately a child");
            child._parent = null;
            _children.Remove(child);
            if (!_children.Any())
                _children = null;
            return true;
        }
    }
}